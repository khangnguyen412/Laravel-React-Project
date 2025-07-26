/* eslint-disable */
import { API_URL } from '../Config';

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
    }
    window.location.href = "/login";
}

export const Login = async (username, password) => {
    if(IsEmail(username)) {
        const email = username
        var get_data = JSON.stringify({ email, password })
    }else {
        var get_data = JSON.stringify({ username, password })
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
        if (window.location.pathname !== "/login") {
            window.location.href = "/login";
        }
        return false;
    }
    const response = await fetch(`${API_URL}/admin/user`, {
        headers: {
            "X-Token": token
        }
    })
    if (!response.ok) Logout();
    return true;
}

export const UserProfile = async () => {
    if (!CheckAuth()) return false;
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/profile`, {
        headers: {
            "X-Token": token
        }
    });
    if (!response) {
        console.log("Coundn't take userprofile");
        return false;
    }
    const data = await response.json();
    return data.profile;
}