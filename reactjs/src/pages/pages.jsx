/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // eslint-disable-line

function Pages() {
    return (
        <React.Fragment>
            <ul>
                <li>
                    <Link to='/component'>Component</Link>
                </li>
                <li>
                    <Link to='/admin/users'>UserPage</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default Pages;
