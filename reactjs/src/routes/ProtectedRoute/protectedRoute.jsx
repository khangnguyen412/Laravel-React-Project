/* eslint-disable */
import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { CheckAuthThunk } from "../../redux/features/auth";

/**
 * Component
 */
import { Loading } from "../../components/Loading";

export const ProtectedAdmin = ({ children }) => {
    const dispatch = useDispatch()
    const { status } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(CheckAuthThunk())
    }, [dispatch])

    console.log(status);
    if (status === 'loading' || status === 'idle') {
        return <Loading IsLoading={true} />;
    }

    if (status === 'unauthorized') {
        return <Navigate to="/login" replace />
    }

    return children
}