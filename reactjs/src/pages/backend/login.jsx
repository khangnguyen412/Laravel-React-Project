import React from "react";
import { Link } from "react-router-dom"; // eslint-disable-line

import Headers from "../../components/header.jsx";
import Login from "../../components/form/form-login.jsx";

const LoginPage = () => {
    return (
        <React.Fragment>
            <Headers></Headers>
            <main>
                <Login></Login>
            </main>
        </React.Fragment>
    )
}

export default LoginPage;