/* eslint-disable */
import React, { useState, useEffect } from "react";

/**
 * Ant Design
 */
import { Layout} from 'antd';

/**
 * Style
 */
import './../../assets/css/style.scss';
import './../../assets/css/button.scss';
import './../../assets/css/page/dashboard.scss'

/**
 * Components
 */
import SideBar from "./SideBar.jsx";
import HeaderLayout from "./Header.jsx";
import FooterLayout from "./Footer.jsx";
import { Loading } from '../../components/Loading.jsx'

const AdminDashboard = ({SideBarActiveKey, SideBarActiveOpenKey, children}) => {
    return (
        <React.Fragment>
            <HeaderLayout></HeaderLayout>
            <Layout className="layout-wrapper">
                <SideBar activeKey={SideBarActiveKey} activeOpenKey={SideBarActiveOpenKey || ''}></SideBar>
                <Layout>
                    {children}
                    <FooterLayout></FooterLayout>
                </Layout>
            </Layout>
        </React.Fragment>
    )
}
export default AdminDashboard 