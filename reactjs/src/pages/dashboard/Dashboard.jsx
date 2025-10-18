/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GetProfileThunk } from '../../redux/features/auth.jsx';

import dayjs from 'dayjs';

/**
 * Ant Design
 */
import { Breadcrumb, Layout, Row, Col, Calendar, theme, Alert, Typography, Avatar, Button, } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';

/**
 * Style
 */
import './../../assets/css/style.scss';
import './../../assets/css/button.scss';
import './../../assets/css/page/dashboard.scss'

/**
 * Components
 */
import AdminLayout from "../../components/dashboard/AdminLayout.jsx";

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
const { Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs());
    const onSelect = newValue => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const dispatch = useDispatch();
    const [profile, SetProfile] = useState({});
    const { loading } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(GetProfileThunk()).unwrap()
            .then((response) => {
                SetProfile(response.profile);
            })
            .catch((err) => {
                console.error("Lỗi:", err);
            })
    }, [dispatch])

    return (
        <React.Fragment>
            <AdminLayout SideBarActiveKey={'dashboard'}>
                <Content className="layout-wrapper--margin">
                    <Breadcrumb className="container-wrapper" items={[{ title: 'Admin' }, { title: 'Dashboard' }]} />
                    <Row className="dashboard-container">
                        <Col md={24} lg={12} className="dashboard-col">
                            <div className="dashboard-col-wrapper">
                                <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
                                <Calendar value={value} fullscreen={false} onSelect={onSelect} onPanelChange={onPanelChange} />
                            </div>
                        </Col>
                        <Col md={24} lg={12} className="dashboard-col">
                            <div className="dashboard-col-wrapper">
                                <Title level={2} className="container-title">User Infomation</Title>
                                {profile && (
                                    <React.Fragment>
                                        <Row>
                                            <Col span={24} style={{ textAlign: 'center' }}>
                                                <Avatar size={150} icon={<UserOutlined />}></Avatar>
                                            </Col>
                                            <Col span={24}>
                                                <Text strong>Name: </Text>
                                                <Text>{profile?.display_name ?? "N/A"}</Text>
                                            </Col>
                                            <Col span={24}>
                                                <Text strong>Email: </Text>
                                                <Text>{profile?.email ?? "N/A"}</Text>
                                            </Col>
                                            <Col span={24}>
                                                <Text strong>Phone: </Text>
                                                <Text>{profile?.phone ?? "N/A"}</Text>
                                            </Col>
                                            <Col span={24}>
                                                <Text strong>Address: </Text>
                                                <Text>{profile?.address ?? "N/A"}</Text>
                                            </Col>
                                            <Col span={24}>
                                                <Text strong>Role: </Text>
                                                <Text>{profile.role?.name ?? "N/A"}</Text>
                                            </Col>
                                        </Row>
                                        <Row id="edit-profile-btn">
                                            <Button type="primary" size="large" icon={<EditOutlined />} className="linear-gradient-btn">Edit Profile</Button>
                                        </Row>
                                    </React.Fragment>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Content>
            </AdminLayout>

        </React.Fragment>
    )
}
export default AdminDashboard 