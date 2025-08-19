import axios from 'axios';


const API_BASE_URL = "http://localhost:8080/api";

const authClientAxiosConfig = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

authClientAxiosConfig.interceptors.response.use(
    (response) => response,
    (err) =>{
        if(err.response?.status === 401){
            if(window.location.pathname !== '/login' && window.location.pathname !== '/signup' && window.location.pathname !== '/verify-email'){
                window.location.href = '/login';
            }
        }
        return Promise.reject(err);
    }
);

export default authClientAxiosConfig;