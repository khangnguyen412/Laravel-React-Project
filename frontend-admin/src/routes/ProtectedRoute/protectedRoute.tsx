/* eslint-disable */
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

/**
 * Redux
 */
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { CheckAuthThunk } from "@/redux/features/auth";

/** 
 * Hook
 */
import { usePermission } from "@/hooks/usePermission";
import { useRoles } from "@/hooks/useRole"; 

/**
 * Component
 */

/**
 * Style
 */
import "@/assets/scss/loading.scss";

/**
 * Type
 */
type RequiredPermission = string | string[];
type RequiredRole = string[];


export const ProtectedRoute = ({ children, requiredPermission, requiredRole }: { children: React.ReactNode, requiredPermission?: RequiredPermission, requiredRole?: RequiredRole }) => {
    const dispatch = useDispatch<AppDispatch>()
    const checked = useSelector((state: RootState) => state.auth.checked);
    const authenticated = useSelector((state: RootState) => state.auth.authenticated);
    const { hasPermission } = usePermission()
    const { hasRole } = useRoles();


    const checkAuthHandle = async () => {
        try {
            await dispatch(CheckAuthThunk())
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkAuthHandle()
    }, [dispatch])

    if (!checked) {
        return (
            <div className="flex-loading flex-col flex-col-fixed" >
                <div className="wrap-loader--background">
                    <div className="loader">
                        <div className="inner one"></div>
                        <div className="inner two"></div>
                        <div className="inner three"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />
    }

    if (requiredRole && !hasRole(requiredRole)) {
        return <Navigate to="/403" replace />;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
        return <Navigate to="/403" replace />;
    }

    return children
}