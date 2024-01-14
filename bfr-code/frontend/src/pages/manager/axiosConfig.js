import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/manager',
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use( async (config) => {
    config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWEyNzAzOWMwODkxODBiNDc0MzM2YTQiLCJpYXQiOjE3MDUyMDIxMzcsImV4cCI6MTcwNTIwNTczN30.pxHtwHgXKe6wCySM_2jjN49aE-fTSwkPMSFImQlDQ70';
    return config;
});

export default instance;
