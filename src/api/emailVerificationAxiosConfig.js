import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const emailVerificationAxiosConfig = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false, // Don't send cookie
    headers: {
        'Content-Type': 'application/json',
    }
});

emailVerificationAxiosConfig.interceptors.response.use(
    (response) => response,
    (err) =>{
        if(err.response?.status === 401){
            console.log("Hello");
        }
        return Promise.reject(err);
    }
);

export default emailVerificationAxiosConfig;