import React from "react";
import { Link } from "react-router-dom"; // eslint-disable-line

/**
 *  Component
 */
import Headers from "../../components/user/header.jsx";
import Login from "../../components/user/form/form-login.jsx";

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