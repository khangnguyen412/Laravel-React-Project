/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Ant Design
 */
import { Breadcrumb, Layout, theme, Grid, Space, Table, Tag, Card, Row, Col, } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

/**
 * Component
*/
import SideBar from "../../components/dashboard/SideBar.jsx";
import UserProfileModal from "../../components/dashboard/UsersProfileModal.jsx";
import HeaderLayout from "../../components/dashboard/Header.jsx";
import FooterLayout from "../../components/dashboard/Footer.jsx";
import { Loading } from '../../components/Loading.jsx'

/**
 * Redux
 */
import { GetUserListAdminThunk } from '../../redux/features/user';


const { Content } = Layout;

const UserList = () => {
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const dispatch = useDispatch();
    const [IsLoading, SetLoading] = useState(null)
    const [UserList, SetUserList] = useState([])
    const userAdminList = useSelector(state => state.user.userAdminList)

    useEffect(() => {
        (async () => {
            try {
                SetLoading(true);
                const response = await dispatch(GetUserListAdminThunk()).unwrap();
                if (response.data) {
                    SetUserList(response.data.map(item => ({
                        key: String(item.id),
                        display_name: item.display_name,
                        username: item.user_name,
                        address: item.address,
                        email: item.email,
                        role: item.role,
                    })) || [])
                }
            } catch (error) {
                console.log(error)
            } finally {
                SetLoading(false)
            }
        })();
    }, []);

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

    const columns = [
        {
            title: 'Display Name',
            dataIndex: 'display_name',
            key: 'display_name',
            render: (text, record) => <Link onClick={() => showModal(record.key)}>{text}</Link>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text, record) => <Link onClick={() => showModal(record.key)}>{text}</Link>,
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
            render: text => <span>{text}</span>,
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
                    <Link to={`/admin/user/${record.key}/edit`}><EditOutlined key="edit" /></Link>
                    <Link to={`/admin/user/${record.key}/delete`}><DeleteOutlined key="delete" /></Link>
                </Space>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Loading IsLoading={IsLoading} FlexLoading={true}></Loading>
            <Layout height="auto">

                <HeaderLayout></HeaderLayout>
                <Layout style={{ minHeight: '100vh', marginTop: 64 }}>
                    <SideBar activeKey={'users-list'} activeOpenKey={['users']}></SideBar>
                    <Layout>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'User List' }]} />
                            <Row>
                                <Col span={24} style={{ marginBottom: 24, padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG, overflowX: 'auto' }}>
                                    {screens.lg ? (
                                        <React.Fragment>
                                            <Table columns={columns} dataSource={UserList} pagination={false} loading={false} scroll={true} />
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            {UserList.map(item => (
                                                <Card key={item.key} style={{ marginBottom: 8 }} actions={[
                                                    <EyeOutlined key="view" onClick={() => showModal(item.key)} />,
                                                    <Link to={`/admin/user/${item.key}/edit`}><EditOutlined key="edit" /></Link>,
                                                    <Link to={`/admin/user/${item.key}/delete`}><DeleteOutlined key="delete" /></Link>,
                                                ]}>
                                                    <p><b>Tên:</b> {item.display_name}</p>
                                                    <p><b>Username:</b> {item.username}</p>
                                                    <p><b>Email:</b> {item.email}</p>
                                                    <p><b>Address:</b> {item.address}</p>
                                                    <p><b>Role:</b> {item.role.name}</p>
                                                </Card>
                                            ))}
                                        </React.Fragment>
                                    )}
                                </Col>
                            </Row>
                        </Content>
                        <FooterLayout></FooterLayout>
                    </Layout>
                </Layout>
            </Layout>
            <UserProfileModal isOpen={open} onOk={handleOk} onCancel={handleCancel} userID={UserId}></UserProfileModal>
        </React.Fragment>
    );
};
export default UserList;