import React, { useEffect, useState } from "react"; // eslint-disable-line
import { Link } from "react-router-dom";

const MenuDropDown = (props) => {
    return (
        <React.Fragment>
            <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Link className="w-full hover:text-gray-900" to={props.link}>{props.name}</Link>
            </li>
        </React.Fragment>
    )
}
export default MenuDropDown