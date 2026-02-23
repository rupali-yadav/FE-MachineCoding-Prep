"use client";

import { useState } from "react";
import { data } from "./data"


interface IMenuItem {
    uuid: string;
    collection_type: string;
    name: string;
    children: Array<IMenuItem>;
}


//  destructured props
const MenuItem = ({ menuItem }: { menuItem: IMenuItem }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`ml-4 border-l-2 p-2`}>
            <h1 onClick={() => setIsOpen(!isOpen)}>{menuItem?.name}</h1>
            {
                isOpen ? (
                    <div>
                        {menuItem?.children?.length ? menuItem?.children?.map((each) => (
                            <SubMenuItem subMenu={each} />
                        )) : null}
                    </div>
                ) : null
            }
        </div>
    )
};

const SubMenuItem = ({ subMenu }: { subMenu: IMenuItem }) => (
    <>
        {subMenu?.collection_type === "folder" || subMenu?.collection_type === "list" ?
            (<MenuItem menuItem={subMenu} />)
            : (<h3 key={subMenu?.uuid} className="ml-4 border-l-2 p-2">{subMenu?.name}</h3>)
        }
    </>
);



const NestedDropdown = () => (
    <div>{data.length ? data?.map((item) => (<MenuItem key={item?.uuid} menuItem={item} />)) : null}</div>
);

export default NestedDropdown;