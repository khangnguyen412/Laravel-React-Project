import { API_URL } from "../Config";

export const GetUserListAdmin = async () => {
    try {
        const UserList = await fetch(`${API_URL}/admin/user`, {
            headers: {
                "X-Token": localStorage.getItem("token")
            }
        })
        const response = await UserList.json()
        if (!response) {
            throw new Error("Network error")
        }
        return response
    } catch (e) {
        console.log("Error: ", e)
    }
}

export const GetUserIDAdmin = async (id) => {
    try {
        if(!id || !localStorage.getItem("token")){
            console.log(id)
            throw new Error("Coundn't take token or id user")
        }
        const GetUserByID = await fetch(`${API_URL}/admin/user/${id}`, {
            headers: {
                "X-Token": localStorage.getItem("token")
            }
        })
        const response = await GetUserByID.json()
        if(!response.data){
            throw new Error("Coundn't take response")
        }
        return response.data
    } catch (e) {
        console.log("Error: ", e)
    }
}
