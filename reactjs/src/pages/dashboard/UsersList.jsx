/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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

/**
 * Config
 */
import { columns } from '../../config/columnTable';

/**
 * Style
 */
import "../../assets/css/style.scss";
import "../../assets/css/page/userList.scss";

const { Content } = Layout;

const CardAction = (item, showModal) => [
    <EyeOutlined key="view" onClick={() => showModal(item.key)} />,
    <Link to={`/admin/user/${item.key}/edit`}><EditOutlined key="edit" /></Link>,
    <Link to={`/admin/user/${item.key}/delete`}><DeleteOutlined key="delete" /></Link>,
]

const UserList = () => {
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const dispatch = useDispatch();
    const [IsLoading, SetLoading] = useState(null)
    const [UserList, SetUserList] = useState([])

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

    return (
        <React.Fragment>
            <Loading IsLoading={IsLoading} FlexLoading={true}></Loading>
            <Layout height="auto">
                <HeaderLayout></HeaderLayout>
                <Layout className='layout-wrapper' >
                    <SideBar activeKey={'users-list'} activeOpenKey={['users']}></SideBar>
                    <Layout>
                        <Content className='layout-wrapper--margin userlist-container' >
                            <Breadcrumb className='container-wrapper userlist-breadcrumb' items={[{ title: 'User' }, { title: 'User List' }]} />
                            <Row className='container-wrapper userlist-table'>
                                <Col className='userlist-table-col' span={24}>
                                    {screens.lg ? (
                                        <React.Fragment>
                                            <Table columns={columns(showModal)} dataSource={UserList} pagination={false} loading={false} scroll={true} />
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            {UserList.map(item => (
                                                <Card key={item.key} style={{ marginBottom: 8 }} actions={CardAction(item, showModal)}>
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