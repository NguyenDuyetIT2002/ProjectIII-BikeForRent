import axios from 'axios'
import { getManagerToken } from '../../utils/localStorage';

const instance = axios.create({
    baseURL: 'http://localhost:8080/manager',
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use( async (config) => {
    const token = getManagerToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default instance;
