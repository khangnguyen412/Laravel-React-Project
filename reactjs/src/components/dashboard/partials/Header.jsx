/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

/**
 * Config
 */
import { menuItems, menuItemsMobile } from '@/config/menuItem';

/**
 * Ant Design
 */
import { Layout, Menu, Button, Drawer, Grid } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

/**
 * Redux
 */
import { LogoutThunk } from '@/redux/features/auth';

/**
 * Style
 */
import '@/assets/scss/layout/header.scss';

const { Header } = Layout;

const HeaderLayout = () => {
    const navigate = useNavigate()
    const { useBreakpoint } = Grid;
    const dispatch = useDispatch();
    const breakpoints = useBreakpoint();
    const [open, setOpen] = useState(false);
    const [Profile, SetProfile] = useState(null)

    const HandleLogout = async () => {
        try {
            await dispatch(LogoutThunk()).unwrap()
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

    useEffect(() => {
        SetProfile(JSON.parse(localStorage.getItem("profile")));
    }, [])

    return (
        <React.Fragment>
            <Header className="header-layout">
                <div className="header-logo">
                    <svg className="h-6 w-6 mr-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span className="font-bold text-xl text-white">CMS Dashboard</span>
                </div>
                {breakpoints.xs ? (
                    <Button color="default" variant="outlined" onClick={showDrawer}>
                        <MenuOutlined />
                    </Button>
                ) : (
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={menuItems(Profile, HandleLogout)} className="header-menu" />
                )}
            </Header>
            {breakpoints.xs && (
                <Drawer title={`Welcome, ${Profile?.user_name}`} closable={{ 'aria-label': 'Close Button' }} onClose={onClose} open={open} >
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['2']} items={menuItemsMobile(HandleLogout)} className="header-menu" />
                </Drawer>
            )}
        </React.Fragment>
    )
}
export default HeaderLayout