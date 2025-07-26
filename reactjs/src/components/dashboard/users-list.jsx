/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

/**
 *  Component
 */
import Modal from '../../components/dashboard/users-modal-profile'
import Loading from '../../components/loading'

/**
 *  Service
 */
import { GetUserListAdmin } from '../../services/services-users';


const UserList = () => {
    const [IsLoading, SetLoading] = useState(null)
    const [HaveError, SetError] = useState(null)

    const [UserList, SetUserList] = useState([])
    useEffect(() => {
        SetLoading(true);
        SetError('');
        (async () => {
            try {
                const response = await GetUserListAdmin()
                if (response.users_list) {
                    SetUserList(response.users_list || [])
                }
            } catch (error) {
                console.log(error)
                SetError(error.message)
            } finally {
                SetLoading(false)
            }
        })();
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
                    {/* Desktop - Dạng bảng */}
                    <div className="hidden lg:block rounded-lg">
                        <Loading IsLoading={IsLoading} Error={HaveError}></Loading>
                        {UserList ? (
                            <div className="space-y-2">
                                {UserList.map((item) => (
                                    <div key={item.id} className="grid grid-cols-5 p-3 border-b border-gray-200 hover:bg-gray-50" >
                                        <div><Link onClick={() => HandleOpen(item.id)}>{item.display_name}</Link></div>
                                        <div>{item.email}</div>
                                        <div>{item.phone}</div>
                                        <div>
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
                                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffffff", }} />
                                            </button>
                                        </div>
                                        <div>
                                            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded">
                                                <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff", }} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-2 flex flex-col">
                                <span className="flex justify-center">Updating</span>
                            </div>
                        )}
                    </div>

                    {/* Mobile - Dạng card/danh sách */}
                    <div className="block lg:hidden space-y-3">
                        <div className="grid grid-cols-1 bg-gray-100 p-3 text-left font-semibold rounded-lg">
                            <div>User List</div>
                        </div>
                        <Loading IsLoading={IsLoading} Error={HaveError}></Loading>
                        {UserList ? (
                            <React.Fragment>
                                {UserList.map((item) => (
                                    <div key={item.id} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white" >
                                        <div className="font-semibold mb-2">User Information</div>
                                        <div className="space-y-2">
                                            <Link onClick={() => HandleOpen(item.id)}>
                                                <div><span className="font-medium">Name:</span> {item.display_name}</div>
                                                <div><span className="font-medium">Email:</span> {item.email}</div>
                                                <div><span className="font-medium">Phone:</span> {item.phone}</div>
                                            </Link>
                                            {/* <div><span className="font-medium">Update:</span> {item.age}</div> */}
                                            <div className="flex place-content-between">
                                                <button className="z-10 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
                                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffffff", }} />
                                                </button>
                                                <button className="z-10 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded">
                                                    <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff", }} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white" >
                                    <div className="space-y-2">
                                        <span className="font-medium">Updating</span>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                    <Modal isOpen={IsOpen} onClose={HandleOpen} userID={UserId} ></Modal>
                </div>
            </div>
        </React.Fragment>
    )
}
export default UserList