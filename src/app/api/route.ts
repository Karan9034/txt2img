import {NextRequest, NextResponse} from 'next/server'

export async function POST(req: NextRequest) {
    const {prompt} = await req.json()
    const response = await fetch("https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5", {
        body: JSON.stringify(prompt),
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.HF_APIKEY}`,
        },
    })
    const data = await response.blob()
    const res = new NextResponse(data)
    return res
}