import { useMemo, useCallback, useEffect } from 'react';


/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { GetProfileThunk } from '@/redux/features/auth';
import type { AppDispatch, RootState } from '@/redux/store';



export const usePermission = () => {
    const dispatch = useDispatch<AppDispatch>();
    const permissionsData = useSelector((state: RootState) => state.auth.data?.permissions);

    const permissions = useMemo(() => {
        return permissionsData || [];
    }, [permissionsData]);

    const hasPermission = useCallback((required?: string | string[]) => {
        if (!required || required.length === 0) return true;
        const requiredArray = Array.isArray(required) ? required : [required];
        return requiredArray.every((perm) => permissions.includes(perm));
    }, [permissions]);

    const hasAnyPermission = useCallback((required: string[]): boolean => {
        return required.some((perm) => permissions.includes(perm));
    }, [permissions]);

    useEffect(() => {
        dispatch(GetProfileThunk());
    }, [dispatch]);

    return { hasPermission, hasAnyPermission };
}