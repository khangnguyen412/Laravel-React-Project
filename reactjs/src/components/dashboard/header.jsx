/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

/**
 * Ant Design
 */
import { Layout, Menu, Button, Drawer, Grid } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

/**
 * Redux
 */
import { LogoutThunk, GetProfileThunk } from '../../redux/features/auth';

/**
 * Style
 */
import './../../assets/css/layout/header.scss';

const { Header } = Layout;

const HeaderLayout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { useBreakpoint } = Grid;
    const breakpoints = useBreakpoint();
    const [open, setOpen] = useState(false);
    const [Profile, SetProfile] = useState(null)

    const HandleLogout = async () => {
        try {
            const res = await dispatch(LogoutThunk()).unwrap()
            navigate("/login", { replace: true })
        } catch (e) {
            console.log('Lỗi: ', e)
        }
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    const items = [
        {
            key: "1",
            label: <Link href="/home">Home</Link>,
        },
        {
            key: "3",
            label: <span>Welcome, {Profile?.user_name}</span>,
            icon: <UserOutlined />,
            children: [
                { label: <Link to={"/admin/user-profile"}>Profile</Link>, key: 'setting:1' },
                { label: 'Logout', key: 'setting:3', onClick: HandleLogout },
            ],
        },
    ];
    const itemsMenu = [
        {
            key: "1",
            label: <Link href="/home">Home</Link>,
        },
        {
            key: "2",
            label: <Link href={"/admin/user-profile"} >Profile</Link>,
        },
        {
            key: "3",
            onClick: HandleLogout,
            label: <Link href="/Logout">Logout</Link>,
        },
    ];

    useEffect(() => {
        dispatch(GetProfileThunk()).unwrap()
            .then((response) => {
                SetProfile(response.profile);
            })
            .catch((err) => {
                console.error("Lỗi:", err);
            });
    }, [dispatch])

    return (
        <React.Fragment>
            <Header className="header-layout">
                <div className="header-logo">
                    <svg className="h-6 w-6 mr-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span className="font-bold text-xl text-white">CMS Dashboard</span>
                </div>
                {breakpoints.xs? (
                    <Button color="default" variant="outlined" onClick={showDrawer}>
                        <MenuOutlined />
                    </Button>
                ) : (
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items} className="header-menu" />
                )}
            </Header>
            {breakpoints.xs && (
                <Drawer title={`Welcome, ${Profile?.user_name}`} closable={{ 'aria-label': 'Close Button' }} onClose={onClose} open={open} >
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['2']} items={itemsMenu} className="header-menu" />
                </Drawer>
            )}
        </React.Fragment>
    )
}
export default HeaderLayout