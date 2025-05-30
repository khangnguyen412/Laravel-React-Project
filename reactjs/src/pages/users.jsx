import React from "react";
import { Link } from "react-router-dom";

import Headers from "../components/header.jsx";

const user_page = () => {
    return (
        <React.Fragment>
            <Headers></Headers>
            <main>
                <div className="container sm:container md:container lg:container xl:container 2xl:container mx-auto p-4">
                    <form action="/video-38-submit" method="POST">

                        {/* Input field */}
                        <div className="mb-4">
                            <label for="username" className="block text-gray-700 text-sm font-bold mb-2">Họ và tên</label>
                            <input type="text" id="username" name="username" placeholder="Nhập họ và tên" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        {/* Email field */}
                        <div className="mb-4">
                            <label for="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" id="email" name="email" placeholder="Nhập email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        {/* Password field */}
                        <div className="mb-4">
                            <label for="city" className="block text-gray-700 text-sm font-bold mb-2">Thành Phố</label>
                            <input type="texy" id="city" name="city" placeholder="Nhập Thành Phố" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        {/* Submit button */}
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Đăng ký
                        </button>
                    </form>
                </div>

                <div className="container sm:container md:container lg:container xl:container 2xl:container mx-auto p-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">City</th>
                                    <th scope="col" className="px-6 py-3">Update</th>
                                    <th scope="col" className="px-6 py-3">Delect</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        Id
                                    </td>
                                    <td className="px-6 py-4">
                                        Username
                                    </td>
                                    <td className="px-6 py-4">
                                        Email
                                    </td>
                                    <td className="px-6 py-4">
                                        City
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" to={''}>
                                            Update
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" to={''}>
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default user_page;