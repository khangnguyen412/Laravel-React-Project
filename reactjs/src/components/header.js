import React from "react";
import side_bar from '../hooks/sidebar.js';

const Header = () => {
    side_bar();
    return (
        <header class="bg-white">
            <nav class="bg-white shadow-lg">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="flex justify-between">
                        {/* Logo */}
                        <div class="flex space-x-4">
                            <a href="/" class="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                                <svg class="h-6 w-6 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                <span class="font-bold">MyWebsite</span>
                            </a>
                        </div>

                        {/* Primary Nav */}
                        <ul class="hidden md:flex items-center space-x-1">
                            <li class="py-5 px-3 text-gray-700 hover:text-gray-900">
                                <a href="/">Trang chủ</a>
                            </li>
                            <li class="py-5 px-3 text-gray-700 hover:text-gray-900">
                                <a href="/about">Giới thiệu</a>
                            </li>
                            <li class="py-5 px-3 text-gray-700 hover:text-gray-900">
                                <a href="/services">Dịch vụ</a>
                            </li>
                            <li class="py-5 px-3 text-gray-700 hover:text-gray-900">
                                <a href="{{ route('test-route-name') }}">Vào Userlist</a>
                            </li>
                        </ul>

                        {/* Mobile Button */}
                        <div class="md:hidden flex items-center">
                            <button class="mobile-menu-button p-2 bg-white rounded-lg shadow-lg">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </nav>
            <div class="md:hidden sidebar fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform -translate-x-full md:translate-x-0 transition-transform duration-300 z-40">
                <div class="p-4">
                    {/* Logo */}
                    <div class="mb-8">
                        <a href="/" class="flex items-center text-blue-600">
                            <svg class="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            <span class="font-bold text-xl">MyWebsite</span>
                        </a>
                    </div>

                    {/* Navigation Menu */}
                    <nav>
                        <ul class="space-y-2">
                            <li class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <a href="/"> Trang chủ </a>
                            </li>
                            <li class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <a href="/"> Trang chủ </a>
                            </li>
                            <li class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <a href="/"> Trang chủ </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
export default Header