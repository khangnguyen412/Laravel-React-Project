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
import { Description, ButtonViewSource, ForgotPassBtn } from "../../components/user/FormLogin";
import { Loading } from '../../components/Loading'

/**
 * Image
 */
import BackgroundImage from "../../assets/images/login-background.png";

/**
 * Style
 */
import './../../assets/css/page/login.scss';

/**
 * Redux
 */
import { LoginThunk } from "../../redux/features/auth";

/**
 *  Login Form Props
 */
const LoginFormProps = {
    backgroundImageUrl: BackgroundImage,
    backgroundVideoUrl: "https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr",
    logo: "",
    title: "Welcome to CMS System",
    subTitle: "Sign In",
    activityConfig: {
        title: 'CMS System',
        subTitle: <Description></Description>,
        action: <ButtonViewSource></ButtonViewSource>,
    },
    submitter: {
        searchConfig: {
            submitText: 'Login',
        },
    },
}

/**
 *  Login Form Field Props
 */
const FieldProps = {
    size: 'large',
    autoFocus: true,
}

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
            navigate("/admin");
        }
    }, [authToken, profile, navigate])

    return (
        <React.Fragment>
            <main>
                <div className="login-page" id="login-page">
                    <LoginFormPage {...LoginFormProps} onFinish={OnFinish} actions={<ForgotPassBtn error={error}></ForgotPassBtn>}>
                        <React.Fragment>
                            <ProFormText name="username" fieldProps={{ ...FieldProps, prefix: (<UserOutlined style={{ color: token.colorText, }} className={'prefixIcon'} />), }} placeholder={'Username or Email'} rules={[{ required: true, message: 'Please input your username or email!', },]} />
                            <ProFormText.Password name="password" fieldProps={{ ...FieldProps, prefix: (<LockOutlined style={{ color: token.colorText, }} className={'prefixIcon'} />), }} placeholder={'Password'} rules={[{ required: true, message: 'Please input your password!', },]} />
                        </React.Fragment>
                        <div style={{ marginBlockEnd: 24, }} >
                            <ProFormCheckbox noStyle name="autoLogin">
                                Remember Password
                            </ProFormCheckbox>
                        </div>
                    </LoginFormPage>
                </div>
                <Loading IsLoading={loading} FlexLoading={false}></Loading>
            </main>
        </React.Fragment>
    )
}

export default LoginPage;