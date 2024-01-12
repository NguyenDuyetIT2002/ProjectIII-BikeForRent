import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/manager',
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use( async (config) => {
    config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTkxMjVmMzVhNTJhMzg1MzdjMmM5OTgiLCJpYXQiOjE3MDQ5NTE5MjIsImV4cCI6MTcwNDk1NTUyMn0.Pjiuo6LYkWIikYX174EQ2Vn_mWNX2CFJdQ-Tw8A94To';
    return config;
});

export default instance;
