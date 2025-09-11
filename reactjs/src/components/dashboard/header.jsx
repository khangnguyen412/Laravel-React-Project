/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

/**
 * Ant Design
 */
import { Breadcrumb, Layout, Menu, theme, Grid } from 'antd';
import { Space, Table, Tag, Card } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

/**
 * Redux
 */
import { LogoutThunk, GetProfileThunk } from '../../redux/features/auth';


const { Header } = Layout;

const HeaderLayout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [Profile, SetProfile] = useState(null)

    const HandleLogout = async () => {
        try {
            const res = await dispatch(LogoutThunk()).unwrap()
            navigate("/login", { replace: true })
        } catch (e) {
            console.log('Lỗi: ', e)
        }
    };

    const items1 = [
        // {
        //     key: "1",
        //     label: <Link href="/home">Trang chủ</Link>,
        // },
        {
            key: "3",
            label: <span>Welcome, {Profile?.user_name}</span>,
            icon: <UserOutlined />,
            children: [
                { label: <Link to={"/admin/user-profile"}>Profile</Link>, key: 'setting:1'},
                { label: 'Logout', key: 'setting:3', onClick: HandleLogout },
            ],
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
            <Header style={{ display: 'flex', alignItems: 'center', position: "fixed", top: 0, zIndex: 1000, width: "100%", padding: "0 20px" }} >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <svg className="h-6 w-6 mr-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span className="font-bold text-xl text-white">CMS Dashboard</span>
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "end", marginLeft: "20px" }} />
            </Header>
        </React.Fragment>
    )
}
export default HeaderLayout