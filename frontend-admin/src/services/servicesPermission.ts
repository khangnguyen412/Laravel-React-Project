/* eslint-disable */
import { getRequest, postRequest, putRequest, deleteRequest } from '@/api/axios';

/**
 * Type
 */
import type { Permission, PermissionSearchRequest } from '@/types/admin/permissions.type';



export const GetPermissionList = async (params: PermissionSearchRequest): Promise<any> => {
    try {
        return await getRequest('/admin/permissions', { withCredentials: true, params });
    } catch (error) {
        throw error
    }
}

export const GetPermissionByID = async (id?: number): Promise<any> => {
    try {
        console.log(id);
        return await getRequest(`/admin/permissions/${id}`, { withCredentials: true });
    } catch (error) {
        throw error
    }
}

export const CreatePermission = async (data: Permission): Promise<any> => {
    try {
        return await postRequest('/admin/permissions', data, { withCredentials: true });
    } catch (error) {
        throw error
    }
}

export const UpdatePermission = async (id?: number, data?: Permission): Promise<any> => {
    try {
        return await putRequest(`/admin/permissions/${id}`, data, { withCredentials: true });
    } catch (error) {
        throw error
    }
}

export const DeletePermission = async (id?: number): Promise<any> => {
    try {
        return await deleteRequest(`/admin/permissions/${id}`, { withCredentials: true });
    } catch (error) {
        throw error
    }
}