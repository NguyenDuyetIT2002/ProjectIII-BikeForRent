import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CustomerProfile = () => {
  const userInfo = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    // name: userInfo.name,
    // phone: userInfo.phone,
    // address: userInfo.address,
    // passWord: userInfo.passWord,
    "name": "Duyệt",
    "phone": "0122345678",
    "address": "Số 2 Hải Phòng",
    "passWord": "123456"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("User Info from Redux:", userInfo);
  }, [userInfo]);

  const handleUpdate = () => {
    console.log("Update user info:", formData);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Thông tin người dùng</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Họ và tên:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Số điện thoại:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Địa chỉ:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="passWord" className="block text-gray-700 text-sm font-bold mb-2">
              Mật khẩu:
            </label>
            <input
              type="password"
              id="passWord"
              name="passWord"
              value={formData.passWord}
              onChange={handleChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring focus:border-blue-300"
          >
            Cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
