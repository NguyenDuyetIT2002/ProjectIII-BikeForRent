import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    gmail: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiEndpoint = "http://localhost:8080/auth/adminLogin";

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gmail: formData.gmail,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("admin_token", data.data.token);
        toast.success("Đăng nhập thành công, bạn sẽ được chuyển hướng sau 3s", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2500,
        });

        setTimeout(() => {
          navigate("/admin/homepage");
        }, 3000);
      } else {
        toast.error("Đăng nhập thất bại. Vui lòng kiểm tra Gmail và mật khẩu.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi kết nối đến máy chủ.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Gmail
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full"
              type="gmail"
              id="gmail"
              name="gmail"
              placeholder="Nhập tên tài khoản của bạn"
              value={formData.gmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full"
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu của bạn"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="bg-blue-500 text-white rounded-md py-2 px-4 mx-auto block hover:bg-blue-600 transition duration-300"
            onClick={handleSubmit}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
