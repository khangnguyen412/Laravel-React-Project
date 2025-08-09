/* eslint-disable */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/**
 *  Component
 */
import Headers from "../../components/dashboard/header.jsx";
import UsersList from "../../components/dashboard/users-list.jsx";

/**
 *  Service
 */
import { CheckAuth } from "../../services/services-auth.jsx";

const UserPage = () => {
    // CheckAuth()
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState(false);
    const [preview, setPreview] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        setActiveTab('infomation');
    }, []);

    const user = {
        name: 'Nguyen Duc',
        email: 'nguyenduc@example.com',
        role: 'Quản trị viên',
        createdAt: '05/04/2025',
        avatar: 'https://i.pravatar.cc/200?img=1'
    };
    return (
        <React.Fragment>
            <Headers></Headers>
            <main>
                <section className="container mx-auto p-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                        <img src={user.avatar} alt="Avatar" className="w-40 h-40 rounded-full object-cover border-4 border-blue-500" />
                        <div>
                            <h1 className="text-xl font-bold">{user.name}</h1>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-500">Vai trò: {user.role}</p>
                            <p className="text-sm text-gray-500">Thành viên từ: {user.createdAt}</p>
                        </div>
                    </div>


                    {/* Tab tùy chọn */}
                    <div className="mt-8 border-t pt-4">
                        <div className="flex space-x-4">
                            <button className={`py-2 px-4 font-medium hover:text-blue-500 border-b-2 text-blue-500 border-blue-500${(activeTab === 'infomation') ? 'text-blue-500 border-blue-500 ' : 'text-gray-600 hover:text-blue-500'}`} onClick={() => setActiveTab('infomation')}>Thông tin chung</button>
                            <button className={`py-2 px-4 font-medium hover:text-blue-500 border-b-2 ${(activeTab === 'password') ? 'text-blue-500 border-blue-500 ' : 'text-gray-600 hover:text-blue-500'}`} onClick={() => setActiveTab('password')}>Mật khẩu</button>
                        </div>
                        {activeTab === 'infomation' && (
                            <div className="mt-4">
                                {/* Thông tin chi tiết */}
                                <div className="mb-8">
                                    <h2 className="font-semibold text-gray-700 mb-4">Thông tin cá nhân</h2>
                                    {isEditing && (
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">Hình ảnh đại diên</label>
                                                <div className="flex flex-col items-center">
                                                    {preview ? (
                                                        <img src={preview} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                                                    ) : (
                                                        <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                                                    )}
                                                    <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-1">Tên đầy đủ</label>
                                            {isEditing ? (
                                                <input type="text" defaultValue={user.name} className="w-full p-2 border border-gray-300 rounded" />
                                            ) : (
                                                <p>{user.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                                            {isEditing ? (
                                                <input type="email" defaultValue={user.email} className="w-full p-2 border border-gray-300 rounded" />
                                            ) : (
                                                <p>{user.email}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Nút hành động */}
                                <div className="flex justify-end space-x-4 mt-6">
                                    <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" >
                                        {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                                    </button>
                                    <button onClick={() => alert('Lưu thành công!')} disabled={!isEditing} className={`px-4 py-2 rounded transition ${isEditing ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} >
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </div>
                        )}
                        {activeTab === 'password' && (
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Đổi mật khẩu</h3>
                                <form className="space-y-4">
                                    <input type="password" placeholder="Mật khẩu hiện tại" className="w-full p-2 border rounded" />
                                    <input type="password" placeholder="Mật khẩu mới" className="w-full p-2 border rounded" />
                                    <input type="password" placeholder="Xác nhận mật khẩu" className="w-full p-2 border rounded" />
                                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                                        Cập nhật mật khẩu
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </React.Fragment>
    )
}

export default UserPage;