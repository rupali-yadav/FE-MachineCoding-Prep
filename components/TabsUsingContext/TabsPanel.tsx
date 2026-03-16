"use client";

import { useTabs } from "@/context/TabsContext";


type TabsPanelProps = {
  tabId: number;
  children: React.ReactNode;
};

export default function TabsPanel({ tabId, children }: TabsPanelProps) {
  const { activeTab } = useTabs();

  if (activeTab !== tabId) return null;

  return (
    <div role="tabpanel" className="p-4">
      {children}
    </div>
  );
}