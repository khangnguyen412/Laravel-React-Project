/* eslint-disable */
import React, { Suspense, lazy } from "react";
import { ProtectedAdmin } from "./ProtectedRoute/protectedRoute";


const Template = lazy(() => import('../pages/Pages'))
const Component = lazy(() => import('../pages/Component'))
const AdminDashboard = lazy(() => import('../pages/dashboard/Dashboard'))
const Users = lazy(() => import('../pages/dashboard/UsersList'))

export const AdminRoute = [
    {
        path: '/template',
        element: (
            <Suspense fallback={<p>Đang tải...</p>}><Template></Template></Suspense>
        )
    },
    {
        path: '/component',
        element: (
            <Suspense fallback={<p>Đang tải...</p>}><Component></Component></Suspense>
        )
    },
    {
        path: '/admin',
        element: (
            <Suspense>
                <AdminDashboard></AdminDashboard>
                {/* <ProtectedAdmin></ProtectedAdmin> */}
            </Suspense>
        )
    },
    {
        path: '/admin/users',
        element: (
            <Suspense>
                <ProtectedAdmin>
                    <Users></Users>
                </ProtectedAdmin>
            </Suspense>
        )
    },
    {
        path: '',
        element: (
            <Suspense></Suspense>
        )
    },
    {
        path: '/admin/user/:id/edit',
        element: (
            <Suspense></Suspense>
        )
    },
]