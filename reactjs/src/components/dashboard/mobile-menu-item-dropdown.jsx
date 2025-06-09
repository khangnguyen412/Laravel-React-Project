import React, { useState } from "react";
import { Link } from "react-router-dom";

const MenuDropDown = (props) => {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const handleToggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    return (
        <React.Fragment>
            <li className="items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={handleToggleSubmenu}>
                <div className="flex">
                    <Link className="basis-8/12 w-full" to={props.link}>{props.name}</Link>
                    <div className="basis-4/12 items-center justify-items-end justify-end">
                        <svg className={`ml-2 w-4 h-4 transition-transform duration-300 ${isSubmenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div className={`${isSubmenuOpen ? 'block' : 'hidden'} mt-2 py-2 z-10`} >
                    <ul className="space-y-2">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Item 1</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Item 2</li>
                    </ul>
                </div>
            </li>
        </React.Fragment>
    )
}
export default MenuDropDown