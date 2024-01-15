import axios from "axios";
import { getManagerToken } from "../../utils/localStorage";
import { showToast } from "../../utils/toast";

const instance = axios.create({
  baseURL: "http://localhost:8080/manager",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  const token = getManagerToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("manager_token");
      showToast(
        "error",
        "Phiên đăng nhập đã hết hạn, bạn sẽ được chuyển hướng sau 3s"
      );
      setTimeout(() => {
        window.location.href = "/auth/login/?form=manager";
      }, 2500);
    }
    return Promise.reject(error);
  }
);

export default instance;
