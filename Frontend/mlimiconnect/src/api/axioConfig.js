import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://Localhost:5000/api/v1',
    withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
})

export default axiosInstance;