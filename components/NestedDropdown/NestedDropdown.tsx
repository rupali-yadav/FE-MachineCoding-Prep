"use client";

import { useState } from "react";
import { data } from "./data"


interface IMenuItem {
    uuid: string;
    collection_type: string;
    name: string;
    children: Array<IMenuItem>;
}

const TreeNode = ({ node }: { node: IMenuItem }) => {

    const [isOpen, setIsOpen] = useState(false);
    const isExpandable = node.children?.length;
    // node.collection_type === "folder" || node.collection_type === "list";

    return (
        <div className="ml-4 border-l">
            <button
                className={`ml-2 mt-2 ${isExpandable && "cursor-pointer"} bg-amber-200 py-1 px-2 border-2 rounded-sm`}
                onClick={() => isExpandable && setIsOpen(!isOpen)}
            >
                {node.name}
            </button>
            {/* isOpen ?? show children */}
             {/* Recursively call TreeNode for each node */}
            {
                isOpen && isExpandable ? (node.children.map(
                    (child) => (<TreeNode key={child.uuid} node={child} />)
                )) : null
            }
        </div>
    )
}

const Tree = () => {

    return (
        <div>{data.map((d) => (<TreeNode key={d.uuid} node={d} />))}</div>
    )
}

export default Tree;