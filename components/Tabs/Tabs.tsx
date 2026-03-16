"use client";

import { useMemo, useState } from "react";

type TabItem = {
    id: number;
    label: string;
    content: string;
    disabled?: boolean;
};
const tabData = [
    { id: 1, label: "Tab1", content: "dfjhgjf", disabled: false },
    { id: 2, label: "Tab2", content: "Tab2", disabled: false },
    { id: 3, label: "Tab3", content: "Tab3", disabled: true },
]

const Tabs = () => {

    const [tabs, setTabs] = useState<TabItem[]>(tabData);
    const [activeTab, setActiveTab] = useState<number>(1);

    const activeTabData = useMemo(() => {
        return tabs.filter((t) => t.id === activeTab)[0]
    }, [activeTab]);

    return (
        <div>
            <h1>Tabs</h1>
            <div className=" flex justify-start">
                {tabs.map((t) => (
                    <div
                        key={t?.id}
                        className={`text-xl p-4 cursor-pointer bg-white text-blue-400
                            ${activeTab === t.id && " border-2 border-blue-400"} 
                        ${t.disabled && "cursor-not-allowed bg-gray-100 text-gray-600"}`}
                        onClick={() => !t.disabled && setActiveTab(t.id)}
                    >
                        {t.label}
                    </div>
                ))}
            </div>
            <div
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
                className=" text-4xl"
            >
                {activeTabData?.content}
            </div>
        </div>
    )
}
export default Tabs;