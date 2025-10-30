/* eslint-disable */
import React, { Suspense, lazy } from "react";

const AppDefault = lazy(() => import('@/pages/AppDefault'));
const Login = lazy(() => import('@/pages/user/Login'));
const LoginDefault = lazy(() => import('@/pages/user/LoginDefault'));
const PaymentTest = lazy(() => import('@/pages/user/PaymentTest'));

export const MainRoute = [
    {
        path: '/',
        element: (
            <AppDefault />
        )
    },
    {
        path: '/login',
        element: (
            <Login />
        )
    },
    {
        path: '/login-default',
        element: (
            <LoginDefault />
        )
    },
    {
        path: '/payment-test',
        element: (
            <PaymentTest />
        )
    },
]