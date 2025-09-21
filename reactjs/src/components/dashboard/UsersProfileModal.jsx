/* eslint-disable */
import React, { useEffect, useState } from "react";

/**
 * Ant Design
 */
import { Modal, Button } from 'antd';
import { EditOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';

/**
 * Redux
 */
import { useDispatch } from 'react-redux';
import { GetUserIDAdminThunk } from '../../redux/features/user';

/**
 * Style
 */
import '../../assets/css/loading.scss';

/**
 * Component
 */
import { Loading } from '../Loading';

/**
 * Hook
 */
import { HandleDateTime } from '../../hooks/dayTime';

const CloseBtn = ({ onCancel }) => {
    return (
        <Button key="back" onClick={onCancel}>
            <CloseCircleOutlined />
        </Button>
    )
}
const EditBtn = ({ onOk, loading }) => {
    return (
        <Button key="edit" type="primary" loading={loading} onClick={onOk}>
            <EditOutlined key="edit" />
        </Button>
    )
}
const DeleteBtn = ({ onOk, loading }) => {
    return (
        <Button key="delete" type="primary" color="danger" loading={loading} onClick={onOk}>
            <DeleteOutlined key="delete" />
        </Button>
    )
}

const UserProfileModal = ({ isOpen, onOk, onCancel, loading, userID }) => {
    const dispatch = useDispatch();
    const [IsLoading, SetLoading] = useState(null)
    const [UserData, GetUserData] = useState(null)
    const [CreateAt, SetCreateAt] = useState(null)
    const [UpdateAt, SetUpdateAt] = useState(null)

    const footer = [
        <CloseBtn key="close" onCancel={onCancel} />,
        <EditBtn key="edit" onOk={onOk} loading={loading} />,
        <DeleteBtn key="delete" onOk={onOk} loading={loading} />,
    ]

    useEffect(() => {
        if (!isOpen || !userID) return;
        (async () => {
            try {
                SetLoading(true);
                const response = await dispatch(GetUserIDAdminThunk(userID)).unwrap();
                if (response.data) {
                    GetUserData(response.data)
                    SetCreateAt(HandleDateTime(response.data.created_at, 'FullDate'))
                    SetUpdateAt(HandleDateTime(response.data.updated_at, 'FullDate'))
                }
            } catch (error) {
                console.log("Lỗi:", error.message);
            } finally {
                SetLoading(false)
            }
        })();
    }, [isOpen, userID])

    useEffect(() => {
        if (!isOpen) GetUserData(null);
    }, [isOpen])

    return (
        <React.Fragment>
            {UserData && (
                <React.Fragment>
                    <Loading IsLoading={IsLoading} FlexLoading={true}></Loading>
                    <Modal open={isOpen} title="Infomations" onOk={onOk} onCancel={onCancel} footer={footer} width={1000}>
                        <div>
                            <h1 className="text-2xl font-bold">{UserData.display_name}</h1>
                            <p className="text-gray-600">{UserData.role.name} • Register Date: {CreateAt}</p>
                        </div>
                        <ul className="space-y-2 mt-2" key={UserData.id}>
                            <li><span className="font-medium">Email:</span> {UserData.email}</li>
                            <li><span className="font-medium">Number Phone:</span> {UserData.phone}</li>
                            <li><span className="font-medium">Address:</span> {UserData.address}</li>
                            <li><span className="font-medium">Role:</span> {UserData.role.name}</li>
                            <li><span className="font-medium">Update At:</span> {UpdateAt}</li>
                        </ul>
                    </Modal>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default UserProfileModal