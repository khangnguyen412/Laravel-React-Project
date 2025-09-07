/* eslint-disable */
import React, { Suspense, lazy } from "react";
import { ProtectedAdmin } from "./protected-route/protected-route";


const Template = lazy(() => import('../pages/pages'))
const Component = lazy(() => import('../pages/component'))
const Users = lazy(() => import('../pages/dashboard/users-list'))
const UsersProfile = lazy(() => import('../pages/dashboard/users-profile'))

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
            <Suspense>
                <ProtectedAdmin>
                    <UsersProfile></UsersProfile>
                </ProtectedAdmin>
            </Suspense>
        )
    },
]