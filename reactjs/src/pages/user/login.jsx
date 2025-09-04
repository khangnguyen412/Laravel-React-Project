/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

/**
 *  Ant Design
*/
import { LockOutlined, UserOutlined, } from '@ant-design/icons';
import { LoginFormPage, ProFormCheckbox, ProFormText, } from '@ant-design/pro-components';
import { theme } from 'antd';

/**
 *  Component
 */
import { Description, ButtonViewSource, ForgotPassBtn } from "../../components/user/form-login";
import { Loading } from '../../components/loading'

/**
 * Image
 */
import BackgroundImage from "../../assets/images/login-background.png";

/**
 * Redux
 */
import { LoginThunk } from "../../redux/features/auth";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = theme.useToken();
    const { profile, token: authToken, loading, error, } = useSelector((state) => state.auth);

    const OnFinish = async (values) => {
        dispatch(LoginThunk(values));
    }

    useEffect(() => {
        if (authToken && profile) {
            localStorage.setItem("token", authToken);
            localStorage.setItem("profile", JSON.stringify(profile));
            navigate("/admin/users");
        }
    }, [authToken, profile, navigate])

    /**
     *  Login Form Props
     */
    const ContainerStyle = {
        backgroundColor: 'rgba(0, 0, 0,0.65)',
        backdropFilter: 'blur(4px)',
    }
    const LoginFormProps = {
        backgroundImageUrl: BackgroundImage,
        backgroundVideoUrl: "https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr",
        logo: "",
        title: "Welcome to CMS System",
        subTitle: "Sign In",
        containerStyle: ContainerStyle,
        activityConfig: {
            title: 'CMS System',
            subTitle: (<Description></Description>),
            action: (<ButtonViewSource></ButtonViewSource>),
        },
        submitter: {
            searchConfig: {
                submitText: 'Login',
            },
        },
        actions: (<ForgotPassBtn error={error}></ForgotPassBtn>)
    }

    return (
        <React.Fragment>
            <main>
                <div className="login-page" id="login-page">
                    <LoginFormPage {...LoginFormProps} onFinish={OnFinish}>
                        <React.Fragment>
                            <ProFormText name="username" fieldProps={{ size: 'large', prefix: (<UserOutlined style={{ color: token.colorText, }} className={'prefixIcon'} />), }} placeholder={'Username or Email'} rules={[{ required: true, message: 'Please input your username or email!', },]} />
                            <ProFormText.Password name="password" fieldProps={{ size: 'large', prefix: (<LockOutlined style={{ color: token.colorText, }} className={'prefixIcon'} />), }} placeholder={'Password'} rules={[{ required: true, message: 'Please input your password!', },]} />
                        </React.Fragment>
                        <div style={{ marginBlockEnd: 24, }} >
                            <ProFormCheckbox noStyle name="autoLogin">
                                Remember Password
                            </ProFormCheckbox>
                        </div>
                    </LoginFormPage>
                    <Loading IsLoading={loading}></Loading>
                </div>
            </main>
        </React.Fragment>
    )
}

export default LoginPage;