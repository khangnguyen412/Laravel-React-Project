/* eslint-disable */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/**
 * Ant Design
 */
import { Breadcrumb, Layout, Row, Col, Calendar, theme, Alert, Typography, Avatar, Button, Form, Input, Select } from 'antd';

/**
 *  Component
 */
import HeadersLayout from "../../components/dashboard/Header.jsx";
import SideBar from "../../components/dashboard/SideBar.jsx";
import Footer from "../../components/dashboard/Footer.jsx";


const { Content } = Layout;
const UserPage = () => {
    const user = {
        name: 'Nguyen Duc',
        email: 'nguyenduc@example.com',
        role: 'Quản trị viên',
        createdAt: '05/04/2025',
        avatar: 'https://i.pravatar.cc/200?img=1'
    };
    return (
        <React.Fragment>
            <HeadersLayout></HeadersLayout>
            <Layout style={{ minHeight: '100vh', marginTop: 64 }}>
                <SideBar activeKey={'users-creation'} activeOpenKey={['users']}></SideBar>
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'User Creation' }]} />
                        <Row>
                            <Col md={24} lg={12} style={{ padding: 10 }}>
                                <Typography.Title level={2}>User Create</Typography.Title>
                            </Col>
                        </Row>
                    </Content>
                    <Footer></Footer>
                </Layout>
            </Layout>
        </React.Fragment>
    )
}

export default UserPage;