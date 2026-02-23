"use client";


import { useState } from "react";
import { Field } from "./types";
import FieldBuilder from "./FieldBuilder";
import { buildJSON } from "./utils";


export default function JSONBuilder() {
    const [fields, setFields] = useState<Field[]>([]);

    const jsonOutput = buildJSON(fields);

    return (
        <div className=" bg-blue-100 px-2 py-4">
            <div className=" flex flex-wrap items-start gap-8 text-black ">
                <div className="pr-4 ml-4">
                    <h3 className="text-black mb-2">JSON Builder</h3>

                    <FieldBuilder fields={fields} onChange={setFields} />
                </div>

                <div>
                    <h3 className="text-black mb-2">Preview</h3>
                    <pre className=" text-blue-500">{JSON.stringify(jsonOutput, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
}