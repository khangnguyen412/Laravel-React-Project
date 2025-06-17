/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/**
 *  Component
 */
import Headers from "../../components/dashboard/header.jsx";
import UsersList from "../../components/dashboard/users-list.jsx";

/**
 *  Service
 */
import { CheckAuth } from "../../services/services-auth.jsx";

const UserPage = () => {
    CheckAuth()
    return (
        <React.Fragment>
            <Headers></Headers>
            <main>
                <UsersList></UsersList>
            </main>
        </React.Fragment>
    )
}

export default UserPage;