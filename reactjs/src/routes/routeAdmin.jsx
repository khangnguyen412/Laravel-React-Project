/* eslint-disable */
import React, { Suspense, lazy } from "react";
import { ProtectedAdmin } from "./ProtectedRoute/protectedRoute";


const Template = lazy(() => import('../pages/Pages'))
const Component = lazy(() => import('../pages/Component'))
const AdminDashboard = lazy(() => import('../pages/dashboard/AdminDashboard'))
const Users = lazy(() => import('../pages/dashboard/UsersList'))
const UsersProfile = lazy(() => import('../pages/dashboard/UsersProfile'))

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
                <ProtectedAdmin>
                    <AdminDashboard></AdminDashboard>
                </ProtectedAdmin>
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
        path: '/admin/user/edit',
        element: (
            <Suspense>
                <ProtectedAdmin>
                    <UsersProfile></UsersProfile>
                </ProtectedAdmin>
            </Suspense>
        )
    },
    {
        path: '/admin/user/:id/edit',
        element: (
            <Suspense></Suspense>
        )
    },
]