import { Link } from 'react-router-dom';

/**
 * Ant Design
 */
import { UserOutlined, HomeOutlined, LogoutOutlined, PieChartOutlined, FileOutlined, CopyOutlined, ProductOutlined } from '@ant-design/icons';

export const menuItems = (Profile, HandleLogout) => [
    {
        key: "home",
        label: <Link href="/home">Home</Link>,
    },
    {
        key: "profile",
        label: <span>Welcome, {Profile?.user_name}</span>,
        icon: <UserOutlined />,
        children: [
            { label: <Link to={"/admin/user-profile"}>Profile</Link>, key: 'setting:1' },
            { label: 'Logout', key: 'setting:3', onClick: HandleLogout },
        ],
    },
];

export const menuItemsMobile = (HandleLogout) => [
    {
        key: "home-mobile",
        icon: <HomeOutlined />,
        label: <Link href="/home">Home</Link>,
    },
    {
        key: "profile-mobile",
        icon: <UserOutlined />,
        label: <Link href={"/admin/user-profile"} >Profile</Link>,
    },
    {
        key: "logout-mobile",
        onClick: HandleLogout,
        icon: <LogoutOutlined />,
        label: <Link href="/Logout">Logout</Link>,
    },
];

export const menuItemsSidebar = (HandleLogout) => [
    {
        key: "dashboard",
        label: <Link to="/admin">Admin Board</Link>,
        icon: <PieChartOutlined />,
        access: ['Admin', 'Manager'],
    },
    {
        key: "page",
        label: <Link to="">Page</Link>,
        icon: <FileOutlined />,
        access: ['Admin', 'Manager'],
    },
    {
        key: "blog",
        label: <Link to="">Blog</Link>,
        icon: <CopyOutlined />,
        access: ['Admin', 'Manager'],
        children: [
            { 
                key: 'blog-list', 
                label: <Link to={'/admin/blog'}>Blog List</Link>, 
            },
            { 
                key: 'blog-category', 
                label: <Link to={'/admin/blog-category'}>Category</Link>, 
            },
        ],
    },
    {
        key: "users",
        label: <Link to="">Users</Link>,
        icon: <UserOutlined />,
        access: ['Admin', 'Manager'],
        children: [
            { 
                key: 'users-list', 
                label: <Link to={'/admin/users'}>User List</Link>, 
                access: ['Admin'],
            },
            { 
                key: 'users-role', 
                label: <Link to={'/admin/users-role'}>User Role</Link>, 
                access: ['Admin'],
            },
            {
                key: 'users-permission', 
                label: <Link to={'/admin/users-permission'}>User Permission</Link>, 
                access: ['Admin'],
            },
            { 
                key: 'users-profile', 
                label: <Link to={''}>Profile</Link>, 
            },
        ],
    },
    {
        key: "product",
        label: <Link to="">Product</Link>,
        icon: <ProductOutlined />,
        access: ['Admin', 'Manager'],
        children: [
            { 
                key: 'product-list', 
                label: <Link to={''}>Product List</Link>, 
            },
            { 
                key: 'product-category', 
                label: <Link to={''}>Category</Link>, 
            },
        ],
    },
    {
        key: "logout",
        label: <Link to="">Logout</Link>,
        icon: <LogoutOutlined />,
        onClick: HandleLogout,
    }
]