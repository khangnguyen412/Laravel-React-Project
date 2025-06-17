/* eslint-disable */
import React, { useState } from "react";
import { data, Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';

/**
 *  Css
*/
import "../../assets/css/style.css";

/**
 *  Component
 */
import Loading from '../../components/loading'

/**
 *  Service
 */
import { Login } from "../../services/services-auth";

const LoginForm = () => {
    const [email, SetEmail] = useState('')
    const [password, SetPassWord] = useState('')
    const [IsLoading, SetLoading] = useState(null)
    const [HaveError, SetError] = useState(null)
    const HandleLogin = async (e) => {
        e.preventDefault();
        SetLoading(true)
        SetError('')
        try {
            const response = await Login(email, password)
            if (response && response.status === 200) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("profile", JSON.stringify(response.user));
                window.location.href = "/admin/users";
            } else {
                SetError(response.error)
            }
        } catch (error) {
            console.log('Error: ', error.message);
        } finally {
            SetLoading(false)
        }
    };

    return (
        <React.Fragment>
            <div className="bg-gray-100 h-dvh flex max-sm:flex-col items-center justify-center login-wrap">
                <div className="flex max-sm:flex-col w-full max-w-5xl bg-white p-8 rounded-lg shadow-md place-content-between">
                    <div className="w-full p-4 max-sm:p-0 flex flex-col place-content-start">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">CMS System</h2>
                        <div className="flex flex-col w-full">
                            <span className="font-bold c-primary-color">Language:</span>
                            <span>Php (8.x),Javascript, Mysql (8.x)</span>
                        </div>
                        <div className="flex flex-col w-full mt-4">
                            <span className="font-bold c-primary-color">Framework used in this project:</span>
                            <span>ReactJs, Tailwind CSS (3.x), Laravel (10.x)</span>
                        </div>
                        <div className="flex flex-col w-full mt-4">
                            <span className="font-bold c-primary-color">Tool used in this project:</span>
                            <span>Docker, Postman, DBeaver, MySQL Workbench</span>
                        </div>
                        <div className="flex flex-col w-full mt-4">
                            <p className="font-bold c-primary-color">
                                This is CMS System was developed by Q.Khang. Source was published on My GitHub. Click <Link to="https://github.com/khangnguyen412/Laravel-React-Project" className="mr-1 font-bold c-primary-color"><GitHubIcon></GitHubIcon></Link>to view 
                            </p>
                        </div>
                    </div>
                    <div className="w-full p-4 max-sm:p-0">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign In</h2>
                        <form onSubmit={HandleLogin} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Username or Email</label>
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
                            <Loading IsLoading={IsLoading} Error={HaveError}></Loading>
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