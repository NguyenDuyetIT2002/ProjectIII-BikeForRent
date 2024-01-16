import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../../utils/toast";
import { ImagetoBase64 } from "../../manager/ultility/ImagetoBase64";
import HanoiProvince from "../../../assets/HaNoiProvince.json";
const ManagerSignupForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    passWord: "",
    address: "",
    phone: "",
    province: "",
    identify_code: "",
    license: "",
    gmail: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadImage = async (event) => {
    const data = await ImagetoBase64(event.target.files[0]);
    setFormData((prevData) => ({
      ...prevData,
      license: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = "http://localhost:8080/auth/managerSignup";
    try {
      if (formData.phone.length !== 10) {
        showToast("error", "Số điện thoại không hợp lệ");
        return;
      }
      if (formData.identify_code.length !== 12) {
        showToast("error", "Căn cước công dân không hợp lệ");
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
          province: formData.province,
          identify_code: formData.identify_code,
          license: formData.license,
          gmail: formData.gmail,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        showToast("success", data.message);
        setTimeout(() => {
          navigate("/");
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
      <div className="w-120">
        <form onSubmit={handleSubmit} className="flex flex-wrap -mx-3">
          {/* Username Field */}
          <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
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
          </div>
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <div className="mb-4">
              <label
                htmlFor="province"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Quận/Huyện
              </label>
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
                className="border rounded-md py-2 px-3 w-full"
              >
                <option value="">Chọn quận/huyện</option>
                {HanoiProvince.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="identify_code"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Căn cước công dân
              </label>
              <input
                type="text"
                id="identify_code"
                name="identify_code"
                placeholder="Nhập mã định danh của bạn"
                value={formData.identify_code}
                onChange={handleChange}
                required
                className="border rounded-md py-2 px-3 w-full"
              />
            </div>
            {/* License Field */}
            <div className="mb-4">
              <label
                htmlFor="license"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Giấy phép kinh doanh
              </label>
              {formData.license ? (
                <img src={formData.license} alt={"none"} className="h-full" />
              ) : (
                <span className="text-5xl"></span>
              )}
              <input type="file" name="license" onChange={uploadImage} />
            </div>

            {/* Gmail Field */}
            <div className="mb-4">
              <label
                htmlFor="gmail"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Địa chỉ Gmail
              </label>
              <input
                type="email"
                id="gmail"
                name="gmail"
                placeholder="Nhập địa chỉ Gmail của bạn"
                value={formData.gmail}
                onChange={handleChange}
                required
                className="border rounded-md py-2 px-3 w-full"
              />
            </div>
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

export default ManagerSignupForm;
