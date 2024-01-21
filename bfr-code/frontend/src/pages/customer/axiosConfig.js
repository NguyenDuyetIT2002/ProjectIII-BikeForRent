import axios from "axios";
import { getCustomerToken } from "../../utils/localStorage";
import { showToast } from "../../utils/toast";

const instance = axios.create({
  baseURL: "http://localhost:8080/customer",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  const token = getCustomerToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("customer_token");
      showToast(
        "error",
        "Phiên đăng nhập đã hết hạn, bạn sẽ được chuyển hướng sau 3s"
      );
      setTimeout(() => {
        window.location.href = "/auth/login/?form=customer";
      }, 2500);
    }
    return Promise.reject(error);
  }
);

export default instance;