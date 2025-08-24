/* eslint-disable */
import React, { useState, CSSProperties, useEffect } from "react";
import { data, Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';


/**
 *  Ant Design
*/
import { AlipayOutlined, LockOutlined, MobileOutlined, TaobaoOutlined, UserOutlined, WeiboOutlined, } from '@ant-design/icons';
import { LoginFormPage, ProConfigProvider, ProFormCaptcha, ProFormCheckbox, ProFormText, } from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';

/**
 *  Css
*/
import "../../assets/css/style.scss";
import "../../assets/css/auth/login.scss";

/**
 *  Component
 */
import Loading from '../loading'

/**
 *  Service
 */
import { Login } from "../../services/services-auth";

import bgImage from "../../assets/images/login-background.png";


const iconStyles = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const ForgotPasBtn = () => {
    return (
        <React.Fragment>
            <div className="forgot-pass-btn">
                <a href="/forgot-password">Forgot Password?</a>
            </div>
        </React.Fragment>
    )
}

const Description = () => {
    return (
        <React.Fragment>
            <div className="flex flex-col w-full">
                <span className="font-bold c-primary-color">Language:</span>
                <span>Php (8.x),Javascript, Mysql (8.x)</span>
            </div>
            <div className="flex flex-col w-full mt-4">
                <span className="font-bold c-primary-color">Framework used in this project:</span>
                <span>ReactJs, Tailwind CSS (3.x), Laravel (10.x)</span>
            </div>
            <div className="flex flex-col w-full mt-4">
                <span className="font-bold c-primary-color">Tool used in this project:</span>
                <span>Docker, Postman, DBeaver, MySQL Workbench</span>
            </div>
            <div className="flex flex-col w-full mt-4">
                <p className="font-bold c-primary-color">
                    This is CMS System was developed by Q.Khang. Source was published on My GitHub.
                </p>
            </div>
        </React.Fragment>
    )
}

const ButtonViewSource = () => {
    const { token } = theme.useToken();
    return (
        <React.Fragment>
            <Link to="https://github.com/khangnguyen412/Laravel-React-Project">
                <Button size="large" style={{ borderRadius: 20, background: token.colorBgElevated, color: token.colorPrimary, width: 120, }} >
                    Visit GitHub
                </Button>
            </Link>
        </React.Fragment>
    )
}


const LoginForm = () => {
    const [loginType, setLoginType] = useState('login');
    const { token } = theme.useToken();

    const [IsLoading, SetLoading] = useState(null)
    const [HaveError, SetError] = useState(null)
    const HandleLogin = async (e) => {
        SetLoading(true)
        SetError('')
        try {
            const response = await Login(e.username, e.password)
            if (response && response.status === 200) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("profile", JSON.stringify(response.user));
                window.location.href = "/admin/users";
            } else {
                SetError(response.error)
            }
        } catch (error) {
            console.log('Error: ', error.message);
        } finally {
            SetLoading(false)
        }
    };

    return (
        <React.Fragment>
            <div className="login-page" id="login-page">
                <LoginFormPage backgroundImageUrl={bgImage} logo="" backgroundVideoUrl="" title="Welcome to CMS System" containerStyle={{ backgroundColor: 'rgba(0, 0, 0,0.65)', backdropFilter: 'blur(4px)', }} subTitle="Sign In"
                    activityConfig={{ title: 'CMS System', subTitle: (<Description></Description>), action: (<ButtonViewSource></ButtonViewSource>), }}
                    submitter={{
                        searchConfig: {
                            submitText: 'Login',
                        },
                    }}
                    actions={<ForgotPasBtn></ForgotPasBtn>}
                    onFinish={async (values) => { await HandleLogin(values) }}>
                        <React.Fragment>
                            <ProFormText
                                name="username"
                                fieldProps={{ size: 'large', prefix: ( <UserOutlined style={{ color: token.colorText, }} className={'prefixIcon'} /> ),}}
                                placeholder={'Username or Email'}
                                rules={[{ required: true, message: 'Please input your username or email!', },]} />
                            <ProFormText.Password name="password"
                                fieldProps={{ size: 'large', prefix: (<LockOutlined style={{ color: token.colorText, }} className={'prefixIcon'} />), }}
                                placeholder={'Password'}
                                rules={[{ required: true, message: 'Please input your password!', },]}
                            />
                        </React.Fragment>
                    <div style={{ marginBlockEnd: 24, }} >
                        <ProFormCheckbox noStyle name="autoLogin">
                            Remember Password
                        </ProFormCheckbox>
                    </div>
                </LoginFormPage>
            </div>
            <Loading IsLoading={IsLoading} Error={HaveError}></Loading>
        </React.Fragment>
    )
}
export default LoginForm