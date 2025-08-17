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


const iconStyles = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const Description = () => {
    return (
        <div>
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
        </div>
    )
}

const ButtonViewSource = () => {
    const { token } = theme.useToken();
    return (
        <div>
            <Link to="https://github.com/khangnguyen412/Laravel-React-Project">
                <Button size="large" style={{ borderRadius: 20, background: token.colorBgElevated, color: token.colorPrimary, width: 120, }} >
                    Visit GitHub
                </Button>
            </Link>
        </div>
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
        <div>
            {/* <div className="bg-gray-100 h-dvh flex max-sm:flex-col items-center justify-center login-wrap">
                <div className="flex max-sm:flex-col w-full max-w-5xl bg-white p-8 rounded-lg shadow-md place-content-between">
                    <div className="w-full p-4 max-sm:p-0">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign In</h2>
                        <form onSubmit={HandleLogin} className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username or Email</label>
                                <input type="text" id="username" name="username" value={username} onChange={(e) => SetUsername(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input type="password" id="password" name="password" value={password} onChange={(e) => SetPassWord(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link href="#" className="text-sm text-blue-600 hover:underline">Forget Password?</Link>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200" >
                                Submit
                            </button>
                            <Loading IsLoading={IsLoading} Error={HaveError}></Loading>
                        </form>
                        <div className="flex flex-row justify-center mt-2">
                            <Link to='/' className="text-sm text-blue-600">Return Home Page</Link>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="login-page" id="login-page">
                <LoginFormPage backgroundImageUrl="" logo="" backgroundVideoUrl="" title="Welcome to CMS System" containerStyle={{ backgroundColor: 'rgba(0, 0, 0,0.65)', backdropFilter: 'blur(4px)', }} subTitle="Sign In"
                    activityConfig={{ title: 'CMS System', subTitle: (<Description></Description>), action: (<ButtonViewSource></ButtonViewSource>), }}
                    submitter={{
                        searchConfig: {
                            submitText: 'Login',
                        },
                    }}
                    actions={
                        <div>
                            {/* <div className="login-form-footer" >
                                <Divider plain>
                                    <span style={{ color: token.colorTextPlaceholder, fontWeight: 'normal', fontSize: 14, }} >
                                        其他登录方式
                                    </span>
                                </Divider>
                                <Space align="center" size={24}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            height: 40,
                                            width: 40,
                                            border: '1px solid ' + token.colorPrimaryBorder,
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            height: 40,
                                            width: 40,
                                            border: '1px solid ' + token.colorPrimaryBorder,
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            height: 40,
                                            width: 40,
                                            border: '1px solid ' + token.colorPrimaryBorder,
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <WeiboOutlined style={{ ...iconStyles, color: '#1890ff' }} />
                                    </div>
                                </Space>
                            </div> */}
                        </div>
                    }
                    onFinish={async (values) => { await HandleLogin(values) }}
                >
                    {/*
                    <Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)} >
                        <Tabs.TabPane key={'login'} tab={'Sign In'} />
                        <Tabs.TabPane key={'register'} tab={'Sign Up'} /> 
                    </Tabs>
                    */}
                    {loginType === 'login' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: (
                                        <UserOutlined style={{ color: token.colorText, }} className={'prefixIcon'} />
                                    ),
                                }}
                                placeholder={'Username or Email'}
                                rules={[ { required: true, message: 'Please input your username or email!', }, ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: (
                                        <LockOutlined style={{ color: token.colorText, }} className={'prefixIcon'} />
                                    ),
                                }}
                                placeholder={'Password'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            />
                        </>
                    )}
                    {/* {loginType === 'register' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: (
                                        <MobileOutlined
                                            style={{
                                                color: token.colorText,
                                            }}
                                            className={'prefixIcon'}
                                        />
                                    ),
                                }}
                                name="mobile"
                                placeholder={'手机号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号！',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: '手机号格式错误！',
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: (
                                        <LockOutlined
                                            style={{
                                                color: token.colorText,
                                            }}
                                            className={'prefixIcon'}
                                        />
                                    ),
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder={'请输入验证码'}
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} ${'获取验证码'}`;
                                    }
                                    return '获取验证码';
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                ]}
                                onGetCaptcha={async () => {
                                    message.success('获取验证码成功！验证码为：1234');
                                }}
                            />
                        </>
                    )} */}
                    <div style={{ marginBlockEnd: 24, }} >
                        <ProFormCheckbox noStyle name="autoLogin">
                            Remember Password
                        </ProFormCheckbox>
                        <a style={{ float: 'right', }} >
                            Forgot Password
                        </a>
                    </div>
                </LoginFormPage>
                <Loading IsLoading={IsLoading} Error={HaveError}></Loading>
            </div>
        </div >
    )
}
export default LoginForm