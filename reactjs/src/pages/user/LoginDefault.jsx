/* eslint-disable */
import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 *  Ant Design
*/
import { AlipayOutlined, LockOutlined, MobileOutlined, TaobaoOutlined, UserOutlined, WeiboOutlined, } from '@ant-design/icons';
import { LoginFormPage, ProFormCaptcha, ProFormCheckbox, ProFormText, } from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';

/**
 * Style
*/
import "@/assets/scss/style.scss";
import "@/assets/scss/page/login.scss";

/**
 * Custom Css
 */
const IconStyles = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

/**
 * Form Props
 */

/**
 * Field Props
 */
const CommonFieldProps = { size: "large" };
const icons = (token) => ({
    username: <UserOutlined style={{ color: token.colorText }} className="prefixIcon" />,
    password: <LockOutlined style={{ color: token.colorText }} className="prefixIcon" />,
    mobile: <MobileOutlined style={{ color: token.colorText }} className="prefixIcon" />,
    captcha: <LockOutlined style={{ color: token.colorText }} className="prefixIcon" />,
});
const rules = {
    username: [{ required: true, message: "Please input your username or email!" }],
    password: [{ required: true, message: "Please input your password!" }],
    mobile: [
        { required: true, message: 'Please input your mobile number!' },
        { pattern: /^1\d{10}$/, message: 'Please input a valid mobile number!', },
    ],
    captcha: [{ required: true, message: 'Please input verification code!' }],
};
const CaptchaProps = { size: 'large' };
const CaptchaTextRender = (timing, count) => timing ? `${count} Get verification code` : "Get verification code";
const HandleGetCaptcha = async () => message.success("Get verification code success! Code: 1234");


const SigninForm = ({ token, prefix }) => {
    return (
        <React.Fragment>
            <ProFormText name="username" fieldProps={{ ...CommonFieldProps, prefix: prefix.username, }} placeholder={'Username or Email'} rules={rules.username} />
            <ProFormText.Password name="password" fieldProps={{ ...CommonFieldProps, prefix: prefix.password, }} placeholder={'Password'} rules={rules.password} />
        </React.Fragment>
    )
}

const SignupForm = ({ token, prefix }) => {
    return (
        <React.Fragment>
            <ProFormText name="mobile" fieldProps={{ ...CommonFieldProps, prefix: prefix.mobile, }} placeholder={'Mobile Number'} rules={rules.mobile} />
            <ProFormCaptcha name="captcha" fieldProps={{ ...CommonFieldProps, prefix: prefix.captcha, }} placeholder={'Please input verification code'} rules={rules.captcha} captchaProps={{ ...CaptchaProps }} captchaTextRender={CaptchaTextRender} onGetCaptcha={HandleGetCaptcha} />
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

const LoginMethod = ({ token, active_tab }) => {
    const SpaceStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: 40,
        width: 40,
        border: '1px solid ' + token.colorPrimaryBorder,
        borderRadius: '50%',
    };


    return (
        <React.Fragment>
            <div>
                {active_tab == 'login' && (
                    <div className="forgot-pass-btn">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>
                )}
                <div className="login-form-footer" >
                    <Divider plain>
                        <span style={{ color: token.colorTextPlaceholder, fontWeight: 'normal', fontSize: 14, }} >
                            Other Login Methods
                        </span>
                    </Divider>
                    <Space align="center" size={24}>
                        <div style={SpaceStyle}>
                            <AlipayOutlined style={{ ...IconStyles, color: '#1677FF' }} />
                        </div>
                        <div style={SpaceStyle} >
                            <TaobaoOutlined style={{ ...IconStyles, color: '#FF6A10' }} />
                        </div>
                        <div style={SpaceStyle}>
                            <WeiboOutlined style={{ ...IconStyles, color: '#1890ff' }} />
                        </div>
                    </Space>
                </div>
            </div>
        </React.Fragment>
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
    const { token } = theme.useToken();
    const prefix = icons(token);
    const [loginType, setLoginType] = useState('login');

    /**
     *  Login Form Props
     */
    const ContainerStyle = {
        backgroundColor: 'rgba(0, 0, 0,0.65)',
        backdropFilter: 'blur(4px)',
    }
    const LoginFormProps = {
        backgroundImageUrl: "https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp",
        backgroundVideoUrl: "https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr",
        logo: "https://github.githubassets.com/favicons/favicon.png",
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
        actions: (<LoginMethod token={token} active_tab={loginType}></LoginMethod>)
    }

    return (
        <div>
            <div className="login-page" id="login-page">
                <LoginFormPage {...LoginFormProps} onFinish={async (values) => { console.log("Loged In") }} >
                    <Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)} >
                        <Tabs.TabPane key={'login'} tab={'Sign In'} />
                        <Tabs.TabPane key={'register'} tab={'Sign Up'} />
                    </Tabs>
                    {loginType === 'login' && (<SigninForm token={token} prefix={prefix}></SigninForm>)}
                    {loginType === 'register' && (<SignupForm token={token} prefix={prefix}></SignupForm>)}
                    <div style={{ marginBlockEnd: 24, }} >
                        <ProFormCheckbox noStyle name="autoLogin">
                            Remember Password
                        </ProFormCheckbox>
                    </div>
                </LoginFormPage>
            </div>
        </div >
    )
}
export default LoginForm