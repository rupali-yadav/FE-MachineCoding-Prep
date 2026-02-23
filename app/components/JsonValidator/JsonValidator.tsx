"use client";

import { useState } from "react"

export const JsonValidator = () => {
    const [inputJson, setInputJson] = useState<string>("");
    const [formattedJson, setFormattedJson] = useState<string>("");
    const [result, setResult] = useState<string>();


    const validateJson = () => {
        try {
            const parsed = JSON.parse(inputJson);
            setFormattedJson(JSON.stringify(parsed, null, 2))
            setResult("This is valid JSON 😄");

        } catch (e: any) {
            setFormattedJson("")
            setResult(e?.message);
        }
    }


    return (
        <div className=" border-2 px-4 py-8 flex flex-col items-center">
            {result ? (<h1 className=" text-green-500 font-bold text-4xl mb-2">{result}</h1>) : null}

            <textarea
                rows={10}
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                className=" w-full bg-amber-50 text-black p-4"
            />
            <button
                type="button"
                onClick={validateJson}
                className="bg-blue-400 text-white px-2 py-1 rounded-sm mt-4"
            >
                Validate
            </button>

            {formattedJson ? (<pre>{formattedJson}</pre>) : null}
        </div>

    )
}