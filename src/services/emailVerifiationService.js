import emailVerificationAxiosConfig from "../api/emailVerificationAxiosConfig.js";
import Cookies from "js-cookie";

class EmailVerificationService{
    async sendEmailVerification(verificationToken){
        try{
            const response = await emailVerificationAxiosConfig.get("/auth/verifyemail", {params : {token : verificationToken}});
            return response.data;
        }catch(err){
            throw err.response?.data || err.message;
        }
    }
}
export default new EmailVerificationService();