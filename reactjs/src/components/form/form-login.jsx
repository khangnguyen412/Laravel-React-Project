import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import '../../assets/css/login-page.css';
import Scrollable from "../../assets/js/scrollable";

const Login = () => {
    const [Email, SetEmail] = useState('')
    const [Password, SetPassWord] = useState('')
    useEffect(() =>{
        const HandleLogin = async () => {
            const Login = await fetch('http://localhost:8000/api/v1/login',{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ Email, Password })
            })
            const Data = await Login.json();

            console.log(Login)
            if(!Login.ok){
                alert('Đăng Nhập Thất Bại!');
                window.location.href = '/users';
                return false
            }

            localStorage.setItem('token', Data.token);
            window.location.href = '/users';
        }
    })
    Scrollable();

    return (
        <React.Fragment>
            <div className="bg-gray-100 flex items-center justify-center login-wrap">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Đăng nhập</h2>
                    <form action="#" method="POST" className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email hoặc tên đăng nhập</label>
                            <input type="text" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                            <input type="password" id="password" name="password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200" >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Login