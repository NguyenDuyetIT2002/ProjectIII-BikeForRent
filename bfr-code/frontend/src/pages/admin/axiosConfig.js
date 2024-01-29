import axios from "axios";
import { getAdminToken } from "../../utils/localStorage";
import { showToast } from "../../utils/toast";

const instance = axios.create({
  baseURL: "http://localhost:8080/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  const token = getAdminToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("admin_token");
      showToast(
        "error",
        "Phiên đăng nhập đã hết hạn, bạn sẽ được chuyển hướng sau 3s"
      );
      setTimeout(() => {
        window.location.href = "/auth/login/?form=admin";
      }, 2500);
    }
    return Promise.reject(error);
  }
);

export default instance;
