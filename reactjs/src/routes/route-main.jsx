/* eslint-disable */
import React, { Suspense, lazy } from "react";

const AppDefault = lazy(() => import('../pages/appdefault'));
const Login = lazy(() => import('../pages/user/login'));
const LoginDefault = lazy(() => import('../pages/user/login-default.jsx'));

const Payment = lazy(() => import('../pages/user/payment-test'));

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
            <Suspense fallback={<p>Đang tải...</p>}><Payment></Payment></Suspense>
        )
    },
]