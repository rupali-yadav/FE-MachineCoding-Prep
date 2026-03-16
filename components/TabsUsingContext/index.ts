"use client";

import Tabs from "./Tabs";
import TabsList from "./TabsList";
import TabsPanel from "./TabsPanel";
import TabsTab from "./TabsTab";

export type TabsComponent = React.FC<{ children: React.ReactNode }> & {
  Tab: typeof TabsTab;
  TabsPanel: typeof TabsPanel;
  TabsList: typeof TabsList;
};

const TabsWithSubcomponents = Tabs as TabsComponent;
TabsWithSubcomponents.Tab = TabsTab;
TabsWithSubcomponents.TabsPanel = TabsPanel;
TabsWithSubcomponents.TabsList = TabsList;

export default TabsWithSubcomponents;


// Tabs
//  -Tabs.tsx  -> Provider with state
//  -TabsTab.tsx -> Tab button 
//  -TabsPanel.tsx -> Tab content 
//  -TabsList.tsx  -> loop here based on your data
//  -index.ts -> export all the components from here