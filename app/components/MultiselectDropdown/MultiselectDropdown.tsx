"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Option = {
    label: string;
    value: string;
};

const optionsData: Option[] = [
  { label: "React", value: "react" },
  { label: "Angular", value: "angular" },
  { label: "Vue", value: "vue" },
  { label: "Next.js", value: "nextjs" },
  { label: "Node.js", value: "nodejs" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "HTML5", value: "html5" },
  { label: "CSS3", value: "css3" },
  { label: "Tailwind CSS", value: "tailwind" }
];

export default function MultiSelectDropdown() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<Option[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Toggle dropdown

    const toggleOptions = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    // Select/ Unselect option
    const handleSelect = (selectedOption: Option) => {

        const isAlreadySelected = selected?.some((each) => each.value === selectedOption?.value);

        if (isAlreadySelected) {
            setSelected(selected.filter((each) => each.value === selectedOption?.value));
        } else {
            setSelected([...selected, selectedOption])
        }
    }

    // Remove tag
    const removeTag = (value: string) => {
        setSelected((prev) => prev.filter((each) => each.value === value));
    };


    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {

            // E.TARGET CONTAINS WHERE user has clicked that node
            // contains() will check whether this node is desendant of our dropdown div or not ?
            // if click is not inside our dropdown div then close the options

            if (dropdownRef.current
                && !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);


        return () => { document.removeEventListener("mousedown", handleOutsideClick); }
    }), [];

    return (
        <div className="w-[400px]" ref={dropdownRef}>
            <h1> Multiselect Dropdown </h1>
            <div className="p-4 bg-white border rounded-sm  text-black"
                onClick={toggleOptions}
            >
                {selected?.length === 0 && <div >Choose your skills ...</div>}
                <div className="flex flex-wrap gap-2 ">
                    {selected.length ? selected.map(({ label, value }) => (
                        <div className=" flex items-center gap-2 border p-[2px] rounded-sm">
                            <span>{label}</span>
                            <button onClick={(e) => {
                                // because we dont the parent's onclick to be triggered when we remove any tag
                                e.stopPropagation();
                                removeTag(value);
                            }}>
                                x
                            </button>
                        </div>
                    )) : null}
                </div>
            </div>

            {isOpen && (
                <div
                    className=" bg-white p-3 max-h-[200px] overflow-y-auto"
                >
                    {optionsData?.map(({ value, label }) => {

                        const isChecked = selected?.some((each) => each.value === value);

                        return (
                            <div
                                className={`text-black ${isChecked ? "bg-green-200" : "bg-white"} `}
                                onClick={() => handleSelect({ value, label })}
                            >
                                <input
                                    type="checkbox"
                                    readOnly={true}
                                    checked={isChecked}
                                    className="mr-2"
                                />
                                {label}
                            </div>
                        )
                    })}
                </div>
            )}

        </div>
    )
    
}