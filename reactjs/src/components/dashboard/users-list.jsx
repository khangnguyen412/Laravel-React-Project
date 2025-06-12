/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

/**
 *  Component
 */
import Modal from '../../components/dashboard/users-modal-profile'

/**
 *  Service
 */
import { GetUserListAdmin } from '../../services/users';


const UserList = () => {

    const [UserList, SetUserList] = useState([])
    useEffect(() => {
        GetUserListAdmin().then((response) => {
            if (response.users_list) {
                SetUserList(response.users_list || [])
            }
        })
    }, []);

    const [IsOpen, SetOpen] = useState(false)
    const [UserId, SetUserId] = useState(null)
    const HandleOpen = (id) => {
        SetOpen(!IsOpen)
        SetUserId(id)
    }

    return (
        <React.Fragment>
            <div className="container sm:container md:container lg:container xl:container 2xl:container mx-auto p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Phone</th>
                                <th scope="col" className="px-6 py-3">Update</th>
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
                                    <tr className="bg-white border-b" key={item.id} >
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <Link onClick={() => HandleOpen(item.id)}>{item.display_name}</Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
                                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffffff", }} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded">
                                                <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff", }} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <Modal isOpen={IsOpen} onClose={HandleOpen} userID={UserId} ></Modal>
                </div>
            </div>
        </React.Fragment>
    )
}
export default UserList