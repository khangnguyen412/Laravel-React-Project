/* eslint-disable */
import axios from 'axios';
import { API_URL } from '../Config';

// Tạo instance riêng
const API = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

// Interceptor cho instance riêng
/**
 * Sau hàm này, nếu muốn return về thì dùng
 * return { data: response.data, status: response.status };
 * hoặc 
 * return response.data;
 */
API.interceptors.response.use(
    (response) => response.data, // chỉ trả về data
    (error) => Promise.reject(error.response?.data || { message: error.message })
);

export const postRequest = (endpoint, payload = {}, headers = {}) => {
    return API.post(`${API_URL}${endpoint}`, payload, { headers });
};

export const getRequest = (endpoint, headers = {}) => {
    return API.get(`${API_URL}${endpoint}`, { headers });
};

export const putRequest = (endpoint, payload = {}, headers = {}) => {
    return API.put(`${API_URL}${endpoint}`, payload, { headers });
};

export const deleteRequest = (endpoint, headers = {}) => {
    return API.delete(`${API_URL}${endpoint}`, { headers });
};

