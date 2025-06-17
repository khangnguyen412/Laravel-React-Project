/* eslint-disable */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faPenToSquare, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons'

/**
 *  Loading
 */
import '../../assets/css/loading.css';

/**
 *  Component
 */
import Loading from '../../components/loading';

/**
 *  Hook
 */
import { HandleDateTime } from '../../hooks/hook-daytime';

/**
 *  Service
 */
import { GetUserIDAdmin } from '../../services/services-users';

const UserProfileModal = ({ isOpen, onClose, userID }) => {
    const [IsLoading, SetLoading] = useState(null)
    const [HaveError, SetError] = useState(null)

    const [UserData, GetUserData] = useState(null)
    const [CreateAt, SetCreateAt] = useState(null)
    const [UpdateAt, SetUpdateAt] = useState(null)

    useEffect(() => {
        if (!isOpen) GetUserData(null)
    }, [isOpen])

    useEffect(() => {
        if (!isOpen || !userID) return;
        SetLoading(true);
        SetError(null);
        (async() => {
            try{
                const response = await GetUserIDAdmin(userID)
                if (response){
                    GetUserData(response)
                    SetCreateAt(HandleDateTime(response.created_at, 'FullDate'))
                    SetUpdateAt(HandleDateTime(response.updated_at, 'FullDate'))
                }
            }catch(error){
                SetError(error.message)
            }finally{
                SetLoading(false)
            }
        })();
    }, [isOpen, userID])

    if (!isOpen) return null;
    return (
        <React.Fragment>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 transform transition-all duration-300 scale-100 opacity-100" onClick={(e) => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute top-4 right-8 w-8 h-8 text-gray-500 hover:text-gray-700" >
                        <FontAwesomeIcon icon={faCircleXmark} size="xl" style={{ color: "#2563eb" }} />
                    </button>
                    <Loading IsLoading={IsLoading} Error={HaveError}></Loading>
                    {UserData && (
                        <React.Fragment>
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                                {UserData.avatar !== "" ? (
                                    <img src="https://i.pravatar.cc/100" alt="User" className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-32 h-32 border-b border-gray-600 bg-gray-200 rounded-full object-cover flex items-center justify-center">
                                        <FontAwesomeIcon icon={faUser} className="w-12 h-12" />
                                    </div>
                                )}
                                <div>
                                    <h1 className="text-2xl font-bold">{UserData.display_name}</h1>
                                    <p className="text-gray-600">Updating (ID: {UserData.role_id}) • Register Date: {CreateAt}</p>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h2 className="font-bold text-gray-700">Infomations</h2>
                                    <ul className="space-y-2 mt-2">
                                        <li><span className="font-medium">Email:</span> {UserData.email}</li>
                                        <li><span className="font-medium">Number Phone:</span> {UserData.phone}</li>
                                        <li><span className="font-medium">Address:</span> {UserData.address}</li>
                                        <li><span className="font-medium">Role:</span> Updating (ID: {UserData.role_id})</li>
                                        <li><span className="font-medium">Update At:</span> {UpdateAt}</li>
                                    </ul>
                                    <ul className="space-y-2 mt-2">
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-700">Thông tin khác</h2>
                                    <ul className="space-y-2 mt-2">
                                        <li><span className="font-medium">Thông tin:</span> Đang Cập Nhật ...</li>
                                    </ul>
                                    <ul className="space-y-2 mt-2">
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end space-x-4">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" >
                                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffffff", }} />
                                </button>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserProfileModal