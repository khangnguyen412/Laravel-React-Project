/* eslint-disable */
import axios from 'axios';
import { API_URL } from '../Config';

export const postRequest = (endpoint, payload = {}, headers = {}) => {
    return axios.post(`${API_URL}/${endpoint}`, payload, { headers });
};

export const getRequest = (endpoint, headers = {}) => {
    return axios.get(`${API_URL}/${endpoint}`, { headers });
};

export const putRequest = (endpoint, payload = {}, headers = {}) => {
    return axios.put(`${API_URL}/${endpoint}`, payload, { headers });
};

export const deleteRequest = (endpoint, headers = {}) => {
    return axios.delete(`${API_URL}/${endpoint}`, { headers });
};