/* eslint-disable */
/**
 * axios
 */
import { getRequest } from '../api/axios';

/**
 * Type
 */
import type { UsersSearchRequest } from '@/types/admin/users.type';

export const GetUser = async (params: UsersSearchRequest): Promise<any> => {
    try {
        return await getRequest('/admin/users', { withCredentials: true, params: params });
    } catch (error) {
        throw error
    }
}

export const GetUserByID = async (id?: string): Promise<any> => {
    try {
        return await getRequest(`/admin/users/${id}`, { withCredentials: true });
    } catch (error) {
        throw error
    }
}
