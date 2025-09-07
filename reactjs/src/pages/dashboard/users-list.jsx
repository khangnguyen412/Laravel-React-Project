/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Ant Design
 */
import { Breadcrumb, Layout, theme, Grid, Space, Table, Tag, Card, Modal, Button } from 'antd';

import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

/**
 * Component
*/
import SideBar from "../../components/dashboard/side-bar.jsx";
import HeaderLayout from "../../components/dashboard/header.jsx";
import { Loading } from '../../components/loading'


/**
 *  Service
 */
import { GetUserListAdmin } from '../../services/services-users';


const { Content, Footer } = Layout;

const UserList = () => {
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
    const [IsLoading, SetLoading] = useState(null)
    const [UserList, SetUserList] = useState([])
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    useEffect(() => {
        SetLoading(true);
        (async () => {
            try {
                const response = await GetUserListAdmin()
                if (response.users_list) {
                    const data = response.users_list.map(item => ({
                        key: String(item.id),
                        display_name: item.display_name,
                        username: item.user_name,
                        address: item.address,
                        email: item.email,
                        role: item.role,
                    }));
                    SetUserList(data || [])
                }
            } catch (error) {
                console.log(error)
            } finally {
                SetLoading(false)
            }
        })();
    }, []);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const columns = [
        {
            title: 'Display Name',
            dataIndex: 'display_name',
            key: 'display_name',
            render: text => <Link to={``}>{text}</Link>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: text => <Link to={``} onClick={showModal}>{text}</Link>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: text => <Link to={``}>{text}</Link>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                let color;
                if (role.id === 1) { color = 'volcano'; }
                else if (role.id === 2) { color = 'blue'; }
                else if (role.id === 3) { color = 'green'; }
                return (
                    <Tag color={color} key={role.id}> {role.name} </Tag>
                )
            },
        },
        {
            title: 'Action',
            key: 'action',
            responsive: ['md'],
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/`}><EditOutlined key="edit" /></Link>
                    <Link to={`/`}><DeleteOutlined key="delete" /></Link>
                </Space>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Layout height="auto">
                <HeaderLayout></HeaderLayout>
                <Loading IsLoading={IsLoading}></Loading>
                <Layout style={{ minHeight: '100vh', marginTop: 64 }}>
                    <SideBar></SideBar>
                    <Layout>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
                            {screens.lg ? (
                                <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG, overflowX: 'auto' }}>
                                    <Table columns={columns} dataSource={UserList} pagination={false} loading={false} scroll={true} />
                                </div>
                            ) : (
                                <React.Fragment>
                                    <div style={{ marginBottom: 24, padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG, overflowX: 'auto' }}>
                                        {
                                            UserList.map(item => (
                                                <Card key={item.key} style={{ marginBottom: 8 }} actions={[
                                                    <EyeOutlined key="view" onClick={showModal} />,
                                                    <Link to={'/'}><EditOutlined key="edit" /></Link>,
                                                    <Link to={'/'}><DeleteOutlined key="delete" /></Link>,
                                                ]}>
                                                    <p><b>Tên:</b> {item.display_name}</p>
                                                    <p><b>Username:</b> {item.username}</p>
                                                    <p><b>Email:</b> {item.email}</p>
                                                    <p><b>Address:</b> {item.address}</p>
                                                    <p><b>Role:</b> {item.role.name}</p>
                                                </Card>
                                            ))
                                        }
                                    </div>
                                </React.Fragment>
                            )}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Created by Khang.MNQ ©{new Date().getFullYear()}
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
            <Modal open={open} title="Title" onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        X
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        <EditOutlined key="edit" />
                    </Button>,
                    <Button key="submit" type="primary" color="danger" loading={loading} onClick={handleOk}>
                        <DeleteOutlined key="delete" />
                    </Button>,
                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </React.Fragment>
    );
};
export default UserList;