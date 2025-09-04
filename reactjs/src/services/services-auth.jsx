/* eslint-disable */
import { API_URL } from '../Config';
import axios from 'axios';

const IsEmail = (input) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
};

export const Logout = async () => {
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            "X-Token": localStorage.getItem("token")
        }
    });
    if (!response) throw new Error("Coundn't take response");
    const data = await response.json();
    if (data.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
    }
    return data;
}

export const Login = async (username, password) => {
    let get_data;
    if (IsEmail(username)) {
        get_data = JSON.stringify({ email: username, password })
    } else {
        get_data = JSON.stringify({ username, password })
    }
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: get_data
    })
    if (!response) throw new Error("Coundn't take response");
    const data = await response.json();
    return data;
}

export const CheckAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token || token === 'undefined') {
        return { ok: false, reason: "NO_TOKEN" };
    }
    const response = await fetch(`${API_URL}/admin/profile`, {
        headers: {
            "X-Token": token
        }
    })
    if (!response.ok) return { ok: false, reason: "INVALID_TOKEN" };;
    return { ok: true };
}

export const UserProfile = async () => {
    if (!CheckAuth()) return false;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/profile`, {
        headers: {
            "X-Token": token
        },
    });
    if (!response) {
        console.log("Coundn't take userprofile");
        return false;
    }
    const data = await response.data;
    return data;
}