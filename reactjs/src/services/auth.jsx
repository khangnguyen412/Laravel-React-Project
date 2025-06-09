import { API_URL } from '../Config';

export const Logout = async () => {
    const LogoutStatus = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            "X-Token": localStorage.getItem("token")
        }
    })
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
    if (!Login.ok) {
        alert('Đăng Nhập Thất Bại!');
        return false
    }
    localStorage.setItem('token', Data.token);
    localStorage.setItem('profile', Data.user)
    window.location.href = '/admin/users';

}

export const CheckAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
        return false
    }
    const Respone = await fetch(`${API_URL}/admin/user`, {
        headers: {
            "X-Token": token
        }
    })
    if (!Respone.ok) {
        Logout()
        return false
    }
    return true
}

export const UserProfile = async () => {
    if(!CheckAuth()){
        return false
    }
    const token = localStorage.getItem('token');
    const UserProfile = await fetch(`${API_URL}/admin/profile`,{
        headers: {
            "X-Token": token
        }
    })
    if(!UserProfile){
        console.log('Lỗi ko lấy được người dùng')
        return false
    }
    const Data = await UserProfile.json()
    return Data.profile
}