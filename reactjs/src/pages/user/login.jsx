/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom"; // eslint-disable-line

/**
 *  Component
 */
import Login from "../../components/user/form-login";
import LoginNew from "../../components/user/form-login-new";


const LoginPage = () => {
    return (
        <React.Fragment>
            <main>
                {/* <Login></Login> */}
                <LoginNew></LoginNew>
            </main>
        </React.Fragment>
    )
}

export default LoginPage;