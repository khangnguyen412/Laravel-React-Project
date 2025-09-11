/* eslint-disable */
import axios from 'axios';
import { API_URL } from '../Config';
import { postRequest } from './servicesAxios';

export const Logout = async (token) => {
    try {
        const response = await postRequest('logout', {}, { "X-Token": token });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const Login = async (payload) => {
    try {
        const response = await postRequest('login', payload, { "Content-Type": "application/json" });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const CheckAuth = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/admin/profile`, { headers: { "X-Token": token } })
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const UserProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/admin/profile`, { headers: { "X-Token": token }, });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}