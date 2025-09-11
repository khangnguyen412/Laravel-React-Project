/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { GetProfileThunk } from '../../redux/features/auth';

import dayjs from 'dayjs';

/**
 * Ant Design
 */
import { Breadcrumb, Layout, Row, Col, Calendar, theme, Alert, Typography } from 'antd';

/**
 * Components
 */
import SideBar from "../../components/dashboard/SideBar.jsx";
import HeaderLayout from "../../components/dashboard/Header.jsx";
import FooterLayout from "../../components/dashboard/Footer.jsx";
import { Loading } from '../../components/loading.jsx'

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
const { Content } = Layout;
const { Title, Text } = Typography;


const AdminDashboard = () => {
    const { token } = theme.useToken();
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();


    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs());
    const onSelect = newValue => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const dispatch = useDispatch();
    const [profile, SetProfile] = useState({});
    useEffect(() => {
        dispatch(GetProfileThunk()).unwrap()
            .then((response) => {
                console.log(response.profile);
                SetProfile(response.profile);
            })
            .catch((err) => {
                console.error("Lỗi:", err);
            });
    }, [dispatch])

    return (
        <React.Fragment>
            <Loading IsLoading={false} />
            <HeaderLayout></HeaderLayout>
            <Layout style={{ minHeight: '100vh', marginTop: 64 }}>
                <SideBar activeKey={'dashboard'}></SideBar>
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'List' }]} />
                        <Row>
                            <Col md={24} lg={12} style={{ padding: 10 }}>
                                <div style={{ height: "100%", marginBottom: 24, padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG, overflowX: 'auto' }}>
                                    <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
                                    <Calendar value={value} fullscreen={false} onSelect={onSelect} onPanelChange={onPanelChange} />
                                </div>
                            </Col>
                            <Col md={24} lg={12} style={{ padding: 10 }}>
                                <div style={{ height: "100%", marginBottom: 24, padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG, overflowX: 'auto' }}>
                                    <Title level={2} style={{ fontSize: 18 }}>User Infomation</Title>
                                    {profile && (
                                        <React.Fragment>
                                            <Row>
                                                <Col span={24}>
                                                    <Text strong>Name:</Text>  <Text>{profile.display_name}</Text>
                                                </Col>
                                                <Col span={24}>
                                                    <Text strong>Email:</Text>  <Text>{profile.email}</Text>
                                                </Col>
                                                <Col span={24}>
                                                    <Text strong>Phone:</Text>  <Text>{profile.phone}</Text>
                                                </Col>
                                                <Col span={24}>
                                                    <Text strong>Address:</Text>  <Text>{profile.address}</Text>
                                                </Col>
                                                <Col span={24}>
                                                    <Text strong>Role:</Text>  <Text>{profile.role}</Text>
                                                </Col>
                                            </Row>
                                        </React.Fragment>
                                    )}

                                </div>
                            </Col>
                        </Row>
                    </Content>
                    <FooterLayout></FooterLayout>
                </Layout>
            </Layout>
        </React.Fragment>
    )
}
export default AdminDashboard 