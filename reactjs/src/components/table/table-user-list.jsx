import React from "react";
import { Link } from "react-router-dom";

const create_user = () => {
    return (
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
    )
}
export default create_user