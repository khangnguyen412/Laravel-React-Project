/* eslint-disable */
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { CheckAuthThunk } from "../../redux/features/auth";


export const ProtectedAdmin = ({ children }) => {
    const dispatch = useDispatch()
    const { checked, authenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(CheckAuthThunk())
    }, [dispatch])

    if (!checked) {
        return <div>Đang xác thực...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}