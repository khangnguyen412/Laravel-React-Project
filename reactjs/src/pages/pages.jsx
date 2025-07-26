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
                    <Link to='/admin/users'>Users Page</Link>
                </li>
                <li>
                    <Link to='/admin/user/edit'>Users Profile</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/payment-test'>Payment</Link>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default Pages;
