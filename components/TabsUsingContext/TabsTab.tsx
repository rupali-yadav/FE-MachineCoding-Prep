"use client";

import { useTabs } from "@/context/TabsContext";


interface TabPropsI {
    tabId: number;
    children: React.ReactNode;
    disabled: boolean;
}


const TabsTab = ({ tabId, children, disabled }: TabPropsI) => {

    // read the state from the common hook for the context
    const { activeTab, setActiveTab } = useTabs();

    const isActiveTab = activeTab === tabId;
    return (
        <button
            role="tab"
            className={`text-xl p-4 cursor-pointer bg-white text-blue-400
                            ${isActiveTab && " border-2 border-blue-400"} 
                        ${disabled && "cursor-not-allowed bg-gray-100 text-gray-600"}`
            }
            onClick={() => !disabled && setActiveTab(tabId)}
        >
            {children}
        </button>
    )
}
export default TabsTab;