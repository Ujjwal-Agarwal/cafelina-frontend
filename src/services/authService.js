import authClientAxiosConfig from "../api/authClientAxiosConfig.js";

class AuthService {
    async login(credentials) {
        try{
            const response = await authClientAxiosConfig.post("/auth/login", credentials);
            return response.data;
        }catch(err){
            throw err.response?.data || err.message;
        }
    }

    async logout(){
        try{
            const response = await authClientAxiosConfig.post("/auth/logout", null);
            return response.data;
        }catch (err){
            throw err.response?.data || err.message;
        }
    }

    async getCurrentUser() {
        try{
            const response = await authClientAxiosConfig.get("/auth/me");
            return response.data;
        }catch(err){
            return null;
        }
    }

    async checkAuthStatus(){
        try{
            const user = await this.getCurrentUser();
            return !!user;
        }catch(err){
            return false;
        }
    }
}

export default new AuthService();