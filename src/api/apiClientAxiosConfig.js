import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const apiClientAxiosConfig = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClientAxiosConfig.interceptors.response.use(
    (response) => response,
    (err) =>{
        if(err.response?.status === 401){
            if(window.location.pathname !== '/login' && window.location.pathname !== '/signup'){
                window.location.href = '/login';
            }
        }
        return Promise.reject(err);
    }
);

export default apiClientAxiosConfig();