import React from "react";

const CreateUser = () => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}
export default CreateUser