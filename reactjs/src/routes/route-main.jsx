/* eslint-disable */
import React, { Suspense, lazy } from "react";

const AppDefault = lazy(() => import('../pages/appdefault'));
const Login = lazy(() => import('../pages/user/login'));

export const MainRoute = [
    {
        path: '/',
        element:  <Suspense fallback={<p>Đang tải...</p>}> <AppDefault></AppDefault> </Suspense>
    },
    {
        path: '/login',
        element: <Suspense fallback={<p>Đang tải...</p>}> <Login></Login> </Suspense>
    },
]