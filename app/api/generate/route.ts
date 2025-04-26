import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { imageUrl, style, room, vibe } = body

    console.log("Incoming POST body:", { imageUrl, style, room, vibe })

    if(!room || !style || !vibe || !imageUrl){
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const replicateResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          version: "30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f",
          input: {
          image: imageUrl,
         prompt : `A ${vibe.toLowerCase()} ${style.toLowerCase()} ${room.toLowerCase()}`
        },
      }),
    })

    // const replicateData = await replicateResponse.json()
    console.log("Replicate response status:", replicateResponse.status)
    const replicateData = await replicateResponse.json()
    console.log("Replicate response data:", replicateData)

   

    if (replicateData.error) {
      console.error("Replicate Error:", replicateData.error)
      return NextResponse.json({ error: replicateData.error }, { status: 500 })
    }

    const predictionUrl = replicateData?.urls?.get
    if (!predictionUrl) {
      return NextResponse.json({ error: "Prediction URL not found" }, { status: 500 })
    }

    let outputUrl = null

    while (!outputUrl) {
      const pollRes = await fetch(predictionUrl, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      })

      const pollData = await pollRes.json()

      if (pollData.status === "succeeded") {
        outputUrl = pollData.output
        console.log("Final AI Output:", pollData.output)
      } else if (pollData.status === "failed") {
        return NextResponse.json({ error: "Generation failed" }, { status: 500 })
      }

      await new Promise((res) => setTimeout(res, 1500))
    }

    return NextResponse.json({ resultUrl: outputUrl })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
