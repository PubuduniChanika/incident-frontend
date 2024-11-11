import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8080"

    static async login(email, password){
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {email, password});
            return response.data;
        } catch (error) {
            throw new Error("Error logging in");
        }
    }
    static async register(userData, token){
        try {
            const response = await axios.post(`${UserService.BASE_URL}/admin/register`, userData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error("Error registration");
        }
    }

    static async getAllUsers(token){
        try {
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error("Error fetching users"+error.message);
        }
    }

    static async getYourProfile(token){
        try {
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error("Error registration");
        }
    }

    static async getUserById(userId, token){
        try {
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-user/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error("Error registration");
        }
    }

    static async deleteUser(userId, token){
        try {
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error("Error registration");
        }
    }

    static async updateUser(userId, userData, token){
        try {
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error("Error updating");
        }
    }

    static logout(){
        localStorage.removeItem('token');
        // localStorage.removeItem('userId');
        // localStorage.removeItem('username');
        localStorage.removeItem('role');
        window.location.href = '/';
    }
    
    static isAuthenticated(){
        const token = localStorage.getItem('token');
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role');
        return role == 'ISO'
    }

    static isUser(){
        const role = localStorage.getItem('role');
        return role == 'TEAM'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin()
    }
}

export default UserService;