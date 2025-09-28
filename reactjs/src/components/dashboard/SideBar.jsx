/* eslint-disable */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Redux
 */
import { useDispatch } from 'react-redux';
import { LogoutThunk } from '../../redux/features/auth';

/**
 * Ant Design
 */
import { Layout, Menu, Grid } from 'antd';

/**
 * Config
 */
import { menuItemsSidebar } from '../../config/menuItem';

const { Sider } = Layout;

const SideBar = ({ activeKey, activeOpenKey }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const [collapsed, setCollapsed] = useState(false);
    
    const HandleLogout = async () => {
        try {
            const res = await dispatch(LogoutThunk()).unwrap()
            navigate("/login", { replace: true })
        } catch (e) {
            console.log('Lỗi: ', e)
        }
    };
    
    const menuItems = menuItemsSidebar(HandleLogout);

    return (
        <React.Fragment>
            <Sider theme='light' collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} collapsedWidth={!screens.md ? 0 : 80} style={!screens.md && { height: "100%", position: "fixed", left: 0, top: 64, zIndex: 999, }}>
                <div className="demo-logo-vertical" />
                <Menu theme="light" defaultSelectedKeys={[activeKey]} defaultOpenKeys={activeOpenKey} mode="inline" items={menuItems} />
            </Sider>
        </React.Fragment>
    )
}
export default SideBar