import { API_URL } from '../Config';

export const GetUserListAdmin = async () => {
    try {
        const UserList = await fetch(`${API_URL}/admin/user`, {
            headers: {
                "X-Token": localStorage.getItem("token")
            }
        })
        const response = await UserList.json()
        if (!response) {
            throw new Error('Lỗi mạng')
        }
        return response
    } catch (e) {
        console.log('Lỗi:' + e)
    }
}

export const GetUserIDAdmin = async () => {
    try {

    } catch (e) {

    }
}
