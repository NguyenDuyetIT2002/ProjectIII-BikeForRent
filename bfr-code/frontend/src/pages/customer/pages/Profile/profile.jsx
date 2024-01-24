import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateInfo } from '../../../../redux/customerSlice';
import axiosConfig from '../../axiosConfig';
import { toast } from 'react-toastify';

const CustomerProfile = () => {
  const userInfo = useSelector((state) => state.customer.customerInfo); // Sử dụng useSelector để lấy thông tin từ Redux store
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    _id: userInfo?._id || "",
    name: userInfo?.name || "", // Tránh lỗi khi userInfo không có giá trị
    phone: userInfo?.phone || "",
    address: userInfo?.address || "",
    passWord: userInfo?.passWord || "",
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
    // Update formData khi userInfo thay đổi (nếu có)
    setFormData({
      _id: userInfo?._id || "",
      name: userInfo?.name || "",
      phone: userInfo?.phone || "",
      address: userInfo?.address || "",
      passWord: userInfo?.passWord || "",
    });
  }, [userInfo]);

  const handleUpdate = async () => {
    try {
      // Thực hiện gọi API để cập nhật thông tin trên server
      const response = await axiosConfig.put(`http://localhost:8080/customer/updateInfo/${formData._id}`, formData);

      if (response.status === 200) {
        // Nếu cập nhật thành công, cập nhật thông tin trong Redux store
        dispatch(updateInfo(formData));

        toast.success('Thông tin đã được cập nhật thành công!', { position: toast.POSITION.TOP_CENTER });
      } else {
        toast.error('Có lỗi xảy ra khi cập nhật thông tin!', { position: toast.POSITION.TOP_CENTER });
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật thông tin!', { position: toast.POSITION.TOP_CENTER });
    }
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
