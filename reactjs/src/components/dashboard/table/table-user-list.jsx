import React, { useEffect, useState } from "react";

function CreateUser() {
    const [UserList, SetUserList] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token");
        const GetUserApi = async () => {
            try {
                const GetUserData = await fetch('http://localhost:8000/api/v1/user', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const Data = await GetUserData.json();
                if (!Data.data) {
                    window.location.href = '/login'
                }
                SetUserList(Data.data || [])
            } catch (e) {
                window.location.href = '/login'
                console.log('Có lỗi: ' + e)
            }
        }
        GetUserApi()
    }, []);
    return (
        <div className="container sm:container md:container lg:container xl:container 2xl:container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Adress</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                            <th scope="col" className="px-6 py-3">View/Update</th>
                            <th scope="col" className="px-6 py-3">Delect</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!UserList ? (
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    Đang Cập Nhật
                                </td>
                            </tr>
                        ) : (
                            UserList.map((item) => (
                                <tr className="bg-white border-b" key={item.id}>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {item.display_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button data-id={item.id} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                            View/Update
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button data-id={item.id} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default CreateUser