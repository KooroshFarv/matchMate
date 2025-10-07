import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { imageUrl, style, room, vibe } = body

    // --- Safely convert Cloudinary image to RGB JPEG and limit size ---
    const safeImageUrl = imageUrl.includes("/upload/")
      ? imageUrl.replace("/upload/", "/upload/f_jpg,w_800,h_800,c_limit/")
      : imageUrl

    console.log("Incoming POST body:", { safeImageUrl, style, room, vibe })

    if (!room || !style || !vibe || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    console.log("Replicate token loaded:", !!process.env.REPLICATE_API_TOKEN)

    const replicateResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
        input: {
          image: safeImageUrl,
          prompt: `A ${vibe.toLowerCase()} ${style.toLowerCase()} ${room.toLowerCase()}`,
          guidance_scale: 6,
          num_inference_steps: 10,
        },
      }),
    })

    if (!replicateResponse.ok) {
      const errText = await replicateResponse.text()
      console.error("Replicate API Error:", errText)
      return NextResponse.json(
        { error: "Failed to call Replicate API", details: errText },
        { status: 500 }
      )
    }

    const replicateData = await replicateResponse.json()
    const predictionUrl = replicateData?.urls?.get

    if (!predictionUrl) {
      return NextResponse.json(
        { error: "Prediction URL not found" },
        { status: 500 }
      )
    }

    console.log("🌀 Polling started for:", predictionUrl)

    // --- Poll until image generation completes ---
    let outputUrl: string | null = null
    for (let attempt = 0; attempt < 60; attempt++) {
      await new Promise((r) => setTimeout(r, 2000)) // wait 2s between polls

      const pollRes = await fetch(predictionUrl, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      })

      if (!pollRes.ok) continue
      const pollData = await pollRes.json()
      console.log(`Polling [${attempt}] → ${pollData.status}`)

      if (pollData.status === "succeeded") {
        outputUrl = Array.isArray(pollData.output)
          ? pollData.output[0]
          : pollData.output
        break
      }

      if (pollData.status === "failed") {
        console.error("Generation failed:", pollData.error)
        return NextResponse.json(
          { error: pollData.error || "Generation failed" },
          { status: 500 }
        )
      }
    }

    if (!outputUrl) {
      console.error("❌ Timed out waiting for output")
      return NextResponse.json(
        { error: "Generation timed out after 120s" },
        { status: 504 }
      )
    }

    console.log("✅ Generation succeeded:", outputUrl)
    return NextResponse.json({ resultUrl: outputUrl })
  } catch (error: unknown) {
    console.error("❌ API Error:", error)
    return NextResponse.json(
      {
        error: "Something went wrong",
        details:
          error instanceof Error ? error.message : JSON.stringify(error),
      },
      { status: 500 }
    )
  }
}
