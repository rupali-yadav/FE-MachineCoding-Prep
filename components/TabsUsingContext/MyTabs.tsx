"use client";

import Tabs from "./"

const tabData = [
    { id: 1, label: "Tab1", content: "dfjhgjf", disabled: false },
    { id: 2, label: "Tab2", content: "Tab2", disabled: false },
    { id: 3, label: "Tab3", content: "Tab3", disabled: true },
]

const MyTabs = () => {



    return (
        <>
            <Tabs>
                <Tabs.TabsList>
                    {/* tabs */}
                    {tabData.map((t) => (
                        <Tabs.Tab key={t.id} tabId={t.id} disabled={t.disabled}>
                            {t.label}
                        </Tabs.Tab>
                    ))}
                </Tabs.TabsList>
                {tabData.map((t) => (
                    <Tabs.TabsPanel key={t.id} tabId={t.id}>
                        {t.content}
                    </Tabs.TabsPanel>
                ))}
            </Tabs>
        </>
    )
}

export default MyTabs;