import React from "react";

import Headers from "../../components/header.jsx";
import UsersList from "../../components/table/table-user-list.jsx";

const UserPage = () => {
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