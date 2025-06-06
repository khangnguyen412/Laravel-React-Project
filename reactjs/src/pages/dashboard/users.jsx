import React from "react";

import Headers from "../../components/dashboard/header.jsx";
import UsersList from "../../components/dashboard/table/table-user-list.jsx";
import { CheckAuth } from "../../services/auth.js";

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