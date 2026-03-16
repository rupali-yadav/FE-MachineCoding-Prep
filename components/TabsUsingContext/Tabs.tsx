
"use client";

// expose the children to context by wrapping them in Provider

import { TabsContext } from "@/context/TabsContext"
import { useState } from "react";


const Tabs = ({ children }: { children: React.ReactNode }) => {
    //1. add state and logic to your context state
    const [activeTab, setActiveTab] = useState<number>(1);

    //2. return the children wrapped in Provider
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabsContext.Provider>
    )
}

export default Tabs;


