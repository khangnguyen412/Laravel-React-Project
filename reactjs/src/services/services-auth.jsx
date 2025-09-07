/* eslint-disable */
import { API_URL } from '../Config';
import axios from 'axios';

const IsEmail = (input) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
};

export const Logout = async () => {
    try{
        const response = await axios.post(`${API_URL}/logout`, {}, { headers: { "X-Token": localStorage.getItem("token") }});
        console.log(response.data)
        if (response.data.status === 200) {
            localStorage.removeItem("token");
            localStorage.removeItem("profile");
        }
        return response.data;
    }catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Logout failed");
        }
        throw new Error(error.message || "Network error");
    }
}

export const Login = async (username, password) => {
    try {
        let payload;
        if (IsEmail(username)) {
            payload = { email: username, password }
        } else {
            payload = { username, password }
        }
        const response = await axios.post(`${API_URL}/login`, payload, { headers: { "Content-Type": "application/json" } })
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Login failed");
        }
        throw new Error(error.message || "Network error");
    }
}

export const CheckAuth = async () => {
    try{
        const token = localStorage.getItem("token");
        if (!token || token === 'undefined') {
            return { ok: false, reason: "NO_TOKEN" };
        }
        const response = await axios.get(`${API_URL}/admin/profile`, {headers: {"X-Token": token}})
        if (response.status != 200) return { ok: false, reason: "INVALID_TOKEN" };
        return { ok: true };
    }catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Unauthorized");
        }
        throw new Error(error.message || "Network error");
    }
}

export const UserProfile = async () => {
    if (!CheckAuth()) return false;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/profile`, {headers: { "X-Token": token },});
    if (!response) {
        console.log("Coundn't take userprofile");
        return false;
    }
    const data = await response.data;
    return data;
}