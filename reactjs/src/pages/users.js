import React from "react";
import Header from "../components/header.js";

const user_page = () => {
    return (
        <body>
            <Header />
            <main>
                <div class="container sm:container md:container lg:container xl:container 2xl:container mx-auto p-4">
                    <form action="/video-38-submit" method="POST">
                        {/* Ghi đè phương thức */}

                        {/* Chống tấn công xss */}

                        {/* Input field */}
                        <div class="mb-4">
                            <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Họ và tên</label>
                            <input type="text" id="username" name="username" placeholder="Nhập họ và tên" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        {/* Email field */}
                        <div class="mb-4">
                            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" id="email" name="email" placeholder="Nhập email" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        {/* Password field */}
                        <div class="mb-4">
                            <label for="city" class="block text-gray-700 text-sm font-bold mb-2">Thành Phố</label>
                            <input type="texy" id="city" name="city" placeholder="Nhập Thành Phố" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        {/* Submit button */}
                        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Đăng ký
                        </button>
                    </form>
                </div>

                <div class="container sm:container md:container lg:container xl:container 2xl:container mx-auto p-4">
                    <div class="overflow-x-auto">
                        <table class="min-w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3">ID</th>
                                    <th scope="col" class="px-6 py-3">Name</th>
                                    <th scope="col" class="px-6 py-3">Email</th>
                                    <th scope="col" class="px-6 py-3">City</th>
                                    <th scope="col" class="px-6 py-3">Update</th>
                                    <th scope="col" class="px-6 py-3">Delect</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b">
                                    <td class="px-6 py-4 font-medium text-gray-900">
                                        Id
                                    </td>
                                    <td class="px-6 py-4">
                                        Username
                                    </td>
                                    <td class="px-6 py-4">
                                        Email
                                    </td>
                                    <td class="px-6 py-4">
                                        City
                                    </td>
                                    <td class="px-6 py-4">
                                        <a class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                            Update
                                        </a>
                                    </td>
                                    <td class="px-6 py-4">
                                        <a class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </body>
    )
}

export default user_page;