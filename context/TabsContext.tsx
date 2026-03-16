"use client";

import { createContext, useContext,} from "react";

interface TabsContextTypeI {
    activeTab: number;
    setActiveTab: (val: number) => void;
}

export const TabsContext = createContext<TabsContextTypeI | null>(null);

export const useTabs = () => {
    const context = useContext(TabsContext);

    if(!context) throw new Error("tabs component must be used inside the tab");
    return context;
};