import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 *  CSS
 */
import '../../../assets/css/login-page.css';

/**
 *  JS
 */
import Scrollable from "../../../assets/js/scrollable";

/**
 *  Service
 */
import { Login } from "../../../services/auth";

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
            <div className="bg-gray-100 flex items-center justify-center login-wrap">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Đăng nhập</h2>
                    <form onSubmit={HandleLogin} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email hoặc tên đăng nhập</label>
                            <input type="text" id="email" name="email" value={email} onChange={(e) => SetEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                            <input type="password" id="password" name="password" value={password} onChange={(e) => SetPassWord(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <span className="ml-2 text-sm text-gray-600">Ghi nhớ</span>
                            </label>
                            <Link href="#" className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</Link>
                        </div>

                        {/* Submit Button */}
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200" >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}
export default LoginForm