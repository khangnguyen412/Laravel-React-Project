/* eslint-disable */
import React, { useState, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';

/**
 * Ant Design
 */
import { Breadcrumb, Layout, Grid, Table, Card, Row, Col, Typography, Tag, Space, Button, } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { ProList, ProTable, PageContainer } from '@ant-design/pro-components';

/**
 * Component
*/
import UserProfileModal from "@/components/dashboard/UsersProfileModal.jsx";
import AdminLayout from "@/components/dashboard/layout/AdminLayout.jsx";

/**
 * Redux
 */
import { GetUserListAdminThunk } from '@/redux/features/user';

/**
 * Style
 */
import "@/assets/scss/style.scss";
import "@/assets/scss/page/userList.scss";

const { Content } = Layout;

const UserList = () => {
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const dispatch = useDispatch();

    /**
     * User Data
     */
    const getUserListAdmin = async () => {
        try {
            const response = await dispatch(GetUserListAdminThunk()).unwrap();
            if (response?.data) return response
        } catch (error) {
            console.log(error)
        }
    }

    const [open, setOpen] = useState(false);
    const [UserId, SetUserId] = useState(null)
    const showModal = (id) => {
        SetUserId(id)
        setOpen(true);
    };

    const handleOk = () => {
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    /**
     * Page Container Config
     */
    const PageContainerConfig = {
        SideBarActiveKey: 'users-role',
        SideBarActiveOpenKey: 'users',
        HeaderTitle: 'Users Role',
        BreadcrumbItems: {
            items: [
                { title: 'Users', path: '/admin' },
                { title: 'Users Role' },
            ],
        },
    };

    /**
     * Search Config
     */
    const searchConfig = {
        display_name: { label: 'Name', placeholder: 'Search by name...' },
        username: { label: 'Username', placeholder: 'Search by username...' },
        email: { label: 'Email', placeholder: 'Search by email...' },
    };

    /**
     * Table Config
     */
    const columnsConfig = [
        {
            title: 'id',
            hidden: true,
            search: false,
        },
        {
            title: 'Name',
            dataIndex: 'display_name',
            key: 'display_name',
            search: true,
            formItemProps: { label: searchConfig.display_name.label },
            fieldProps: { placeholder: searchConfig.display_name.placeholder },
            render: (text, record) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: 'Username',
            dataIndex: 'user_name',
            key: 'user_name',
            search: true,
            formItemProps: { label: searchConfig.username.label },
            fieldProps: { placeholder: searchConfig.username.placeholder },
            render: (text, record) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            search: true,
            formItemProps: { label: searchConfig.email.label },
            fieldProps: { placeholder: searchConfig.email.placeholder },
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            search: false,
            render: text => <span>{text}</span>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            search: false,
            render: (role) => {
                let colorRole = ''
                if (role.id === 1) { colorRole = 'volcano'; }
                else if (role.id === 2) { colorRole = 'blue'; }
                else if (role.id === 3) { colorRole = 'green'; }
                return (
                    <Tag color={colorRole} key={role.id}> {role.name} </Tag>
                )
            },
        },
        {
            title: 'Action',
            key: 'action',
            responsive: ['md'],
            search: false,
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(record.id)} icon={<EyeOutlined />} key="view" color="info" variant="outlined" />
                    <Button to={{/* /admin/user/${record.key}/edit */ }} icon={<EditOutlined />} key="edit" color="primary" variant="outlined" />
                    <Button to={{/* /admin/user/${record.key}/delete */ }} icon={<DeleteOutlined />} key="delete" color="danger" variant="outlined" />
                </Space>
            ),
        },
    ]

    const actionRef = useRef();
    const formRef = useRef();
    const tablePropsConfig = useMemo(() => ({
        actionRef: actionRef,
        formRef: formRef,
        rowKey: 'id',
        headerTitle: 'User List',
        columns: columnsConfig,
        search: {
            collapsed: false,
            collapseRender: false,
            optionRender: (searchConfig, formProps, dom) => [
                React.cloneElement(dom[0], { children: "Clear" }),
                React.cloneElement(dom[1], { children: 'Search' }),
            ],
        },
        toolBarRender: () => [
            <Button key="button" icon={<PlusOutlined />} onClick={() => { }} type="primary" >
                Add
            </Button>
        ],
        request: async (params, sort, filter) => {
            const response = await getUserListAdmin();
            return {
                data: response?.data || [],
                total: response?.total || 0,
                success: true,
            }
        }
    }), [])

    /**
     * ProList Config
     */
    const proListPropsConfig = useMemo(() => ({
        formRef: formRef,
        actionRef: actionRef,
        headerTitle: 'User List',
        pagination: {
            showQuickJumper: true,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showTotal: false,
            showLessItems: true,
            size: "small",
            align: "center"
        },
        metas: {
            title: {
                title: 'Name',
                dataIndex: 'display_name',
                render: (text, record) => {
                    return (
                        <React.Fragment>
                            <Typography level={3} style={{ fontWeight: "bold" }} >{record?.user_name}</Typography>
                        </React.Fragment>
                    )
                }
            },
            description: {
                title: 'User Info',
                render: (text, record) => {
                    return (
                        <React.Fragment>
                            <Typography level={3}>Username: {record?.user_name}</Typography>
                            <Typography level={3}>Email: {record?.email}</Typography>
                            <Typography level={3}>Phone: {record?.phone}</Typography>
                            <Typography level={3}>Role: {record?.role?.guard_name}</Typography>
                        </React.Fragment>
                    )
                },
                search: false,
            },
            actions: {
                render: (_, record) => [
                    <div key="actions" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {/* <ConfirmDelete itemName={record.name} onConfirm={deleteRole} key={`delete-${record.id}`} /> */}
                        <Button variant="outlined" icon={<EditOutlined />} size="small" color="primary" onClick={() => { console.log(123) }} key={`update-${record.id}`} />
                    </div>,
                ],
            },
        },
        search: {
            collapsed: false,
            collapseRender: false,
            optionRender: (searchConfig, formProps, dom) => [
                React.cloneElement(dom[0], { children: 'Clear' }),
                React.cloneElement(dom[1], { children: 'Search' }),
            ],
        },
        toolBarRender: () => [
            <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => { }}>
                Add
            </Button>,
        ],
        request: async (params) => {
            const response = await getUserListAdmin();
            console.log(response?.data || 123);
            return {
                data: response?.data || [],
                success: true,
            }
        }
    }), [])

    return (
        <React.Fragment>
            <AdminLayout {...PageContainerConfig}>
                <Row>
                    <Col span={24}>
                        {screens.lg ? (
                            <React.Fragment>
                                <ProTable {...tablePropsConfig} />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <ProList {...proListPropsConfig} />
                            </React.Fragment>
                        )}
                    </Col>
                </Row>
            </AdminLayout>
            <UserProfileModal isOpen={open} onOk={handleOk} onCancel={handleCancel} userID={UserId}></UserProfileModal>
        </React.Fragment >
    );
};
export default UserList;