import { useMemo, useCallback, useEffect } from 'react';

/**
 * Redux
 */
import { useDispatch, useSelector} from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { GetProfileThunk } from '@/redux/features/auth';



export const useRoles = () => {
    const dispatch = useDispatch<AppDispatch>();
    const roles = useSelector((state: RootState) => state.auth.data?.role);

    const roleName = useMemo(() => {
        return roles?.name || '';
    }, [roles]);


    const hasRole = useCallback((allowedRoles: string[]) => {
        if (!allowedRoles || allowedRoles.length === 0) return true;
        return allowedRoles.includes(roleName);
    }, [roleName]);

    useEffect(() => {
        dispatch(GetProfileThunk());
    }, [dispatch]);

    return { roleName, hasRole };
}