import { API_URL } from '../Config';

export const Logout = async () => {
    const LogoutStatus = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    console.log(LogoutStatus)
    if (LogoutStatus.status === 200) {
        localStorage.removeItem("token");
        window.location.href = '/login';
    }
}

export const Login = async (email, password) => {
    const Login = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password
        })
    })
    const Data = await Login.json();

    console.log(Login)
    if (!Login.ok) {
        alert('Đăng Nhập Thất Bại!');
        return false
    }

    localStorage.setItem('token', Data.token);
    window.location.href = '/users';
}

export const CheckAuth = async () => {
    
}