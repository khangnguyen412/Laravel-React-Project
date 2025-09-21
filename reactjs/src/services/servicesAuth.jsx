/* eslint-disable */
import { postRequest, getRequest } from './axios';

export const Logout = async (token) => {
    try {
        return await postRequest('/logout', {}, { "Authorization": `Bearer ${token}` });
    } catch (error) {
        throw error;
    }
}

export const Login = async (payload) => {
    try {
        return await postRequest('/login', payload, { "Content-Type": "application/json" });
    } catch (error) {
        throw error;
    }
}

export const CheckAuth = async (token) => {
    try {
        return await getRequest('/admin/profile', { "Authorization": `Bearer ${token}` })
    } catch (error) {
        throw error;
    }
}

export const UserProfile = async (token) => {
    try {
        return await getRequest('/admin/profile', { "Authorization": `Bearer ${token}` })
    } catch (error) {
        throw error;
    }
}