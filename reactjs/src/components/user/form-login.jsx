/* eslint-disable */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';

/**
 *  Js
 */
import Scrollable from "../../assets/js/users/scrollable";

/**
 *  Service
 */
import { Login } from "../../services/auth";

const LoginForm = () => {
    const [email, SetEmail] = useState('')
    const [password, SetPassWord] = useState('')
    const HandleLogin = async (e) => {
        e.preventDefault();
        try {
            await Login(email, password);
        } catch (e) {
            alert('Đăng nhập thất bại');
        }
    };
    Scrollable();

    return (
        <React.Fragment>
            <div className="bg-gray-100 h-dvh flex max-sm:flex-col items-center justify-center login-wrap">
                <div className="flex max-sm:flex-col w-full max-w-5xl bg-white p-8 rounded-lg shadow-md place-content-between">
                    <div className="w-full p-4 max-sm:p-0 flex flex-col place-content-start">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">CMS System</h2>
                        <div className="flex flex-col w-full">
                            <p className="font-bold">This is CMS System was developed by Q.Khang</p>
                        </div>
                        <div className="flex flex-col w-full mt-4">
                            <span className="font-bold">Technology use in this project:</span>
                            <ul className="list-inside list-disc">
                                <li> ReactJs, Tailwind CSS </li>
                                <li> Laravel </li>
                            </ul>
                        </div>
                        <div className="w-full mt-4">
                            <Link to="https://github.com/khangnguyen412/Laravel-React-Project" className="mr-1 font-bold">Source was published on My GitHub <GitHubIcon></GitHubIcon></Link>
                        </div>
                    </div>
                    <div className="w-full p-4 max-sm:p-0">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign In</h2>
                        <form onSubmit={HandleLogin} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Username Or Email</label>
                                <input type="text" id="email" name="email" value={email} onChange={(e) => SetEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input type="password" id="password" name="password" value={password} onChange={(e) => SetPassWord(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link href="#" className="text-sm text-blue-600 hover:underline">Forget Password?</Link>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200" >
                                Submit
                            </button>
                        </form>
                        <div className="flex flex-row justify-center mt-2">
                            <Link to='/' className="text-sm text-blue-600">Return Home Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default LoginForm