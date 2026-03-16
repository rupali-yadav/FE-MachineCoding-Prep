"use client";

type TabsListProps = {
    children: React.ReactNode;
};

export default function TabsList({ children }: TabsListProps) {
    return (
        <div role="tablist" className="flex gap-2">
            {children}
        </div>
    );
}