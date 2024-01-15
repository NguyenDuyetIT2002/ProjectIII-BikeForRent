import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../../utils/toast";

const CustomerSignupForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    passWord: "",
    address: "",
    phone: "",
    name: "",
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
    const apiEndpoint = "http://localhost:8080/auth/customerSignup";
    try {
      if (formData.phone.length > 10) {
        showToast("error", "Số điện thoại không được vượt quá 10 ký tự!");
        return;
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.userName,
          passWord: formData.passWord,
          address: formData.address,
          phone: formData.phone,
          name: formData.name,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        showToast("success", data.message);
        setTimeout(() => {
          navigate("/auth/login?form=customer");
        }, 3000);
      } else {
        showToast("error", data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("error", "Có lỗi xảy ra khi kết nối đến máy chủ.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tên tài khoản
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Nhập tên tài khoản của bạn"
              value={formData.userName}
              onChange={handleChange}
              required
              className="border rounded-md py-2 px-3 w-full"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="passWord"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="passWord"
              name="passWord"
              placeholder="Nhập mật khẩu của bạn"
              value={formData.passWord}
              onChange={handleChange}
              required
              className="border rounded-md py-2 px-3 w-full"
            />
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Địa chỉ
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Nhập địa chỉ của bạn"
              value={formData.address}
              onChange={handleChange}
              required
              className="border rounded-md py-2 px-3 w-full"
            />
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại của bạn"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border rounded-md py-2 px-3 w-full"
            />
          </div>

          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nhập tên của bạn"
              value={formData.name}
              onChange={handleChange}
              required
              className="border rounded-md py-2 px-3 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-
4 px-8 mx-auto block hover:bg-blue-600 transition duration-300"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignupForm;
