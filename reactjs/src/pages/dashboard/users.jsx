import React from "react";

/**
 *  Component
 */
import Headers from "../../components/dashboard/header.jsx";
import UsersList from "../../components/dashboard/users-list.jsx";

/**
 *  Service
 */
import { CheckAuth } from "../../services/auth";

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