import React from "react";
import { Link } from "react-router-dom";

import Sidebar from "../assets/js/sidebar";
import { Login, Logout } from "../services/auth"; // eslint-disable-line

const Header = () => {
    const HandleLogout = async () => {
        try{
            await Logout()
        }catch {
            console.log('Lỗi')
        }
    };
    Sidebar();
    return (
        <React.Fragment>
            <header className="bg-white">
                <nav className="bg-white shadow-lg">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex justify-between">
                            {/* Logo */}
                            <div className="flex space-x-4">
                                <a href="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                                    <svg className="h-6 w-6 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                    <span className="font-bold">CMS System</span>
                                </a>
                            </div>

                            {/* Primary Nav */}
                            <ul className="hidden md:flex items-center space-x-1">
                                <li className="py-5 px-3 text-gray-700 hover:text-gray-900">
                                    <a href="/">Trang chủ</a>
                                </li>
                                <li className="py-5 px-3 text-gray-700 hover:text-gray-900">
                                    <a href="/about">Giới thiệu</a>
                                </li>
                                <li className="py-5 px-3 text-gray-700 hover:text-gray-900">
                                    <a href="/services">Dịch vụ</a>
                                </li>
                                <li className="py-5 px-3 text-gray-700 hover:text-gray-900">
                                    <Link onClick={HandleLogout}>Đăng Xuất</Link>
                                </li>
                            </ul>

                            {/* Mobile Button */}
                            <div className="md:hidden flex items-center">
                                <button className="mobile-menu-button p-2 bg-white rounded-lg shadow-lg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                </nav>
                <div className="md:hidden sidebar fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform -translate-x-full md:translate-x-0 transition-transform duration-300 z-40">
                    <div className="p-4">
                        {/* Logo */}
                        <div className="mb-8">
                            <a href="/" className="flex items-center text-blue-600">
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                <span className="font-bold text-xl">MyWebsite</span>
                            </a>
                        </div>

                        {/* Navigation Menu */}
                        <nav>
                            <ul className="space-y-2">
                                <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    <a href="/"> Trang chủ </a>
                                </li>
                                <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    <a href="/"> Trang chủ </a>
                                </li>
                                <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    <a href="/"> Trang chủ </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}
export default Header