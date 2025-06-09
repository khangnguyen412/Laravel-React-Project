import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

/**
 *  Service
 */
import { GetUserListAdmin } from '../../services/users';


const UserList = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -200%)',
        width: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [UserList, SetUserList] = useState([])
    useEffect(() => {
        GetUserListAdmin().then((response) => {
            if (response.users_list) {
                SetUserList(response.users_list || [])
            }
        })
    }, []);

    const [IsOpen, SetOpen] = useState(false)
    const HandleOpen = () => SetOpen(!IsOpen)
    const HandleClose = () => SetOpen(!IsOpen)

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
                                <th scope="col" className="px-6 py-3">View</th>
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
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button variant="contained" color="info" data-id={item.id}>
                                                Update
                                            </Button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button variant="contained" color="error" data-id={item.id}>
                                                Delete
                                            </Button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button color="primary" onClick={HandleOpen}>
                                                <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <Modal open={IsOpen} onClose={HandleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <Box sx={style}></Box>
                    </Modal>
                </div>
            </div>
        </React.Fragment>
    )
}
export default UserList