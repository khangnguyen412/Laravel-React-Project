import React from "react";
import { Link } from "react-router-dom"; // eslint-disable-line

/**
 *  Component
 */
import Login from "../../components/user/form-login";

const LoginPage = () => {
    return (
        <React.Fragment>
            <main>
                <Login></Login>
            </main>
        </React.Fragment>
    )
}

export default LoginPage;