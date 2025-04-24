import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { imageUrl, style, room, vibe } = body

    const replicateResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        version: "6b5e34ebadd450169fe8c3f6dfc1d41a8df1b95c2304891513c5e85b7e10bfc4",
        input: {
          image: imageUrl,
          room_type: room,
          style,
          vibe,
        },
      }),
    })

    const replicateData = await replicateResponse.json()

    if (replicateData.error) {
      return NextResponse.json({ error: replicateData.error }, { status: 500 })
    }

    const predictionUrl = replicateData?.urls?.get
    if (!predictionUrl) {
      return NextResponse.json({ error: "Prediction URL not found" }, { status: 500 })
    }

    let outputUrl = null

    // Poll until prediction is done
    while (!outputUrl) {
      const pollRes = await fetch(predictionUrl, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      })

      const pollData = await pollRes.json()

      if (pollData.status === "succeeded") {
        outputUrl = pollData.output
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
