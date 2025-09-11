/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Ant Design
 */
import { Layout, Menu, Grid } from 'antd';
import { FileOutlined, PieChartOutlined, ProductOutlined, CopyOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';


function getItem(label, key, icon, children) {
    return { key, icon, children, label, };
}
const items = [
    getItem(<Link to="/admin">Admin Board</Link>, 'dashboard', <PieChartOutlined />),
    getItem('Page', 'page', <FileOutlined />),
    getItem('Blog', 'blog', <CopyOutlined />, [getItem('Blog List', 'blog-list'), getItem('Category', 'blog-category'),]),
    getItem('Users', 'users', <UserOutlined />, [getItem(<Link to={'/admin/users'}>User List</Link>, 'users-list'), getItem('Profile', 'user-profile'),]),
    getItem('Product', 'product', <ProductOutlined />, [getItem('Product List', 'product-list'), getItem('Category', 'product-category'),]),
    getItem('Logout', 'logout', <LogoutOutlined />),
];

const SideBar = ({ activeKey, activeOpenKey }) => {
    const { useBreakpoint } = Grid;
    const { Sider } = Layout;
    const screens = useBreakpoint();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <React.Fragment>
            <Sider theme='light' collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} collapsedWidth={!screens.md ? 0 : 80} style={!screens.md && { height: "100%", position: "fixed", left: 0, top: 64, zIndex: 999, }}>
                <div className="demo-logo-vertical" />
                <Menu theme="light" defaultSelectedKeys={[activeKey]} defaultOpenKeys={activeOpenKey} mode="inline" items={items} />
            </Sider>
        </React.Fragment>
    )
}
export default SideBar