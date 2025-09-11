/* eslint-disable */
import React, { Suspense, lazy } from "react";

const AppDefault = lazy(() => import('../pages/AppDefault'));
const Login = lazy(() => import('../pages/user/Login'));
const LoginDefault = lazy(() => import('../pages/user/LoginDefault'));
const PaymentTest = lazy(() => import('../pages/user/PaymentTest'));

export const MainRoute = [
    {
        path: '/',
        element:  (
            <Suspense fallback={<p>Đang tải...</p>}> <AppDefault></AppDefault> </Suspense>
        )
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<p>Đang tải...</p>}> <Login></Login> </Suspense>   
        )
    },
    {
        path: '/login-default',
        element: (
            <Suspense fallback={<p>Đang tải...</p>}> <LoginDefault></LoginDefault> </Suspense>   
        )
    },
    {
        path: '/payment-test',
        element: (
            <Suspense fallback={<p>Đang tải...</p>}><PaymentTest></PaymentTest></Suspense>
        )
    },
]