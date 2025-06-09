import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 *  Component
 */
import MobileMenuItemDropDown from "../../components/dashboard/mobile-menu-item-dropdown"; // eslint-disable-line
import MobileMenuItem from "../../components/dashboard/mobile-menu-item"; // eslint-disable-line

/**
 *  Service
 */
import { Login, Logout, UserProfile } from "../../services/auth"; // eslint-disable-line
import Avatar from "@mui/material/Avatar";

const Header = () => {
    const HandleLogout = async () => {
        try {
            await Logout()
        } catch (e) {
            console.log('Lỗi:' + e)
        }
    };

    const [Profile, SetProfile] = useState(null)
    useEffect(() => {
        UserProfile().then(response => {
            SetProfile(response)
        })
    }, [])

    const [IsOpen, SetIsOpen] = useState(false)
    const HandleTrigger = () => {
        SetIsOpen(!IsOpen)
    }

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
                                    <span className="font-bold text-blue-600 text-xl">CMS Dashboard</span>
                                </a>
                            </div>

                            {/* Primary Nav */}
                            <ul className="hidden md:flex items-center space-x-1">
                                <li className="py-5 px-3 text-gray-700 hover:text-gray-900">
                                    <Link>Xem Trang Chủ</Link>
                                </li>
                                <li className="py-5 px-3 text-gray-700 hover:text-gray-900">
                                    <Link onClick={HandleLogout}>Đăng Xuất</Link>
                                </li>
                                <li className="py-5 px-3 text-gray-700 hover:text-gray-900">
                                    <button className="menu-button p-2 bg-white rounded-lg shadow-lg" onClick={HandleTrigger}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </li>
                            </ul>

                            {/* Mobile Button */}
                            <div className="md:hidden flex items-center">
                                <button className="mobile-menu-button p-2 bg-white rounded-lg shadow-lg" onClick={HandleTrigger}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className={`fixed right-0 top-0 h-full w-3/12 max-xl:w-4/12 max-lg:w-full bg-white shadow-lg transform ${IsOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-40 `}>
                    <div className="p-4">
                        {/* Logo */}
                        <div className="mb-8">
                            <div className="flex flex-row">
                                <div className="flex basis-8/12 flex-row items-center">
                                    <a href="/" className="flex flex-row text-blue-600">
                                        <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                        <span className="font-bold text-xl">CMS Dashboard</span>
                                    </a>
                                </div>
                                <div className="flex basis-4/12 items-end justify-items-end justify-end">
                                    <button className="mobile-menu-button p-2 bg-white rounded-lg shadow-lg" onClick={HandleTrigger}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <nav className="bg-white max-h-96 overflow-auto">
                            <div className="max-w-6xl mx-auto px-4">
                                <ul className="space-y-2">
                                    <MobileMenuItemDropDown name='Quản Trị' link='/admin/dashboard'></MobileMenuItemDropDown>
                                    <MobileMenuItemDropDown name='Người Dùng' link='/admin/users'></MobileMenuItemDropDown>
                                    <MobileMenuItemDropDown name='Item' link='/'></MobileMenuItemDropDown>
                                    <MobileMenuItem name='Item' link='/'></MobileMenuItem>
                                </ul>
                            </div>
                        </nav>
                    </div>

                    <div className="absolute bottom-0 w-full">
                        <div className="mt-auto p-4">
                            <div className="flex justify-between space-x-2">
                                {Profile ? (
                                    <React.Fragment>
                                        <div className="px-4 py-2 rounded">
                                            <Avatar>K</Avatar>
                                        </div>
                                        <div className="px-4 py-2 rounded flex items-center ">
                                            {Profile.display_name}
                                        </div>
                                    </React.Fragment>
                                ) : (null)}
                                <Button variant="text">
                                    <LogoutIcon onClick={HandleLogout}></LogoutIcon>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}
export default Header