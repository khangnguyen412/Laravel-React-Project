/* eslint-disable */
import { postRequest, getRequest } from '@/api/axios';

export const GetUserList = async (token) => {
    try {
        return await getRequest('/admin/user', { "Authorization": `Bearer ${token}` });
    } catch (error) {
        throw error
    }
}

export const GetUserID = async (token, id) => {
    try {
        return await getRequest(`/admin/user/${id}`, { "Authorization": `Bearer ${token}` });
    } catch (error) {
        throw error
    }
}
