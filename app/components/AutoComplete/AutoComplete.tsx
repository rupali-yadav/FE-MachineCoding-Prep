"use client";

import { useCallback, useState } from "react";

const data = ["java", "javascript", "php", "c#", "go", "dart", "css", "html"];

export default function AutoComplete() {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    // to track if any suggestion is clicked
    const [isHideSuggs, setHideSuggs] = useState<boolean>(false);
    const [selectedVal, setSelectedVal] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState<number>(-1);


    const handleChange = useCallback((e: any) => {
        const input = e.target.value;

        setSelectedVal(input);
        setHideSuggs(false);

        if (!input) {
            return;
        }
        const filteredSuggestion = data.filter((each) => each.toLowerCase().indexOf(input.toLowerCase()) > -1);
        setSuggestions(filteredSuggestion);
    }, []);

    const hideSuggestion = (value: string) => {
        setSelectedVal(value);
        setHideSuggs(true);
    };

    const handleOnKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (suggestions.length === 0) return;
        if (e.key === "ArrowUp") {
            e.preventDefault();

            setActiveIndex((prev) => prev > 0 ? prev - 1 : prev);
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();

            setActiveIndex((prev) => prev < suggestions.length - 1 ? prev + 1 : prev);
        }
        if (e.key === "Enter") {
            e.preventDefault();
            setSelectedVal(suggestions[activeIndex]);
            setHideSuggs(true);
        }

    }, [suggestions, activeIndex]);

    return (
        <div className=" text-black border-2 px-4 py-2 bg-amber-100 h-[60vh] ">
            <div>
                <h1 className=" font-bold mb-5">Search your preferred language</h1>
                <div className="">
                    <input
                        placeholder="Type to search..."
                        type="search"
                        value={selectedVal}
                        onChange={handleChange}
                        onKeyDown={handleOnKeyDown}
                        className="border-2 p-2 "
                    />
                </div>

                <div
                    className={` block ${isHideSuggs && "hidden"}  p-2 w-max min-w-[55] rounded-md`}
                >
                    {suggestions.map((item, i) => (
                        <div
                            key={"" + item + i}
                            onClick={() => {
                                hideSuggestion(item);
                            }}
                            className={` border-b-2 mb-2 ${activeIndex === i && "border-green-500 bg-blue-300"}`}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
