"use client";
import { useEffect, useState } from "react";

export default function Home() {
    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState("")

    const generateImage = async () => {
        if(!prompt) return;
        setIsLoading(true)
        try{
            const res = await fetch("/api", {
                method: "POST",
                body: JSON.stringify({ prompt })
            })
            if(res.ok){
                const blob = await res.blob()
                const img = URL.createObjectURL(blob)
                setResponse(img)
            }else{
                console.error(res)
            }
        }catch(err){
            console.error(err)
        }
        setIsLoading(false)
    }



    return (
        <main className="flex min-h-screen bg-gray-900 flex-col items-center justify-between px-24 py-12">
            <h1 className=" text-5xl mb-4">Txt2Img by Karan</h1>
            <div className="mb-4">
                This is a project that uses Stable Diffusion to generate images from text prompts
            </div>
            <div>
                <input
                    type="text"
                    className="border p-1 text-black rounded-sm border-gray-600"
                    value={prompt}
                    onChange={(event) => {
                        setPrompt(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key.toLowerCase() === "enter") {
                            generateImage();
                        }
                    }}
                />
                <button
                    className="bg-blue-600 px-5 py-1 ml-2 h-max rounded-sm disabled:cursor-not-allowed disabled:bg-blue-900 transition-colors"
                    onClick={generateImage}
                    type="submit"
                    disabled={isLoading || !prompt}
                >
                    Go!{" "}
                </button>
            </div>
            <div className="w-80 h-80 relative">
                {response ? <img src={response} /> : ""}
            </div>
            <button
                className="bg-blue-600 px-5 py-1 ml-2 h-max rounded-sm disabled:cursor-not-allowed disabled:bg-blue-900 transition-colors"
                onClick={() => {
                    if(!response) return;
                    const a = document.createElement("a")
                    a.href = response
                    a.download = "image.png"
                    a.click()
                }}
            >Download</button>
        </main>
    )
}