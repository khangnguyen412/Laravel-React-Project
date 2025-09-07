/* eslint-disable */
import React, { useState } from 'react';

/**
 * Ant Design
 */
import { Layout, Menu, Grid } from 'antd';
import { DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';


function getItem(label, key, icon, children) {
    return { key, icon, children, label, };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5'),]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Logout', '9', <LogoutOutlined />),
];

const SideBar = () => {
    const { useBreakpoint } = Grid;
    const { Sider } = Layout;
    const screens = useBreakpoint();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <React.Fragment>
            <Sider theme='light' collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} collapsedWidth={!screens.md ? 0 : 80} style={!screens.md && { height: "100%", position: "fixed", left: 0, top: 64, zIndex: 999, }}>
                <div className="demo-logo-vertical" />
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
        </React.Fragment>
    )
}
export default SideBar