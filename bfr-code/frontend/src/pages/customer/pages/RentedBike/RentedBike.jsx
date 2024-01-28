import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import axiosConfig from "../../axiosConfig";
import dayjs from "dayjs";
import { showToast } from "../../../../utils/toast";

const CustomerRentedBike = () => {
  const userInfo = useSelector((state) => state.customer.customerInfo);
  const [orders, setOrders] = useState([]);
  const customerInfo = useSelector((state) => state.customer.customerInfo);

  const fetchData = async () => {
    try {
      const response = await axiosConfig.get(
        `/getYourRentedBike/${userInfo._id}`
      );
      if (response.status === 200) {
        setOrders(response.data.data);
      }
    } catch (error) {
      if (error.response) {
        showToast("error", error.response.data.message);
      } else {
        showToast("error", "Có lỗi khi xảy ra, vui lòng thử lại sau");
      }
    }
  };
  const reportBike = async (bike_id) => {
    try {
      console.log(customerInfo._id, bike_id);
      const response = await axiosConfig.post(
        `/requestBanBike/${customerInfo._id}/${bike_id}`
      );
      if (response.status === 200) {
        showToast("success", response.data.message);
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        showToast("error", error.response.data.message);
      } else {
        showToast("error", "Có lỗi khi xảy ra, vui lòng thử lại sau");
      }
    }
  };

  useEffect(() => {
    if (userInfo && userInfo._id) {
      fetchData();
    }
  }, [orders]);

  return (
    <div
      className="flex h-screen "
      style={{ background: "linear-gradient(to right, #f2e2e2, #f0f0f0)" }}
    >
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Đơn Đặt Xe Đã Thuê</h1>
        <ul>
          {orders.map((order) => (
            <li
              key={order._id}
              className="border p-4 mb-4 rounded-lg shadow-md  items-center"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 mt-4 mb-4">
                    Cửa hàng:
                    <span className="ml-4">{order.store_name}</span>
                  </h3>
                  <h3 className="text-2xl font-semibold mb-4 mt-4">
                    Tên xe:
                    <span className="ml-4">{order.bike_name}</span>
                  </h3>
                  <p className="text-xl mt-4 mb-4">
                    <span className="font-bold">Thời Gian Bắt Đầu:</span>{" "}
                    {dayjs(order.startTime).format("HH:mm DD/MM/YYYY")}
                  </p>
                  <p className="text-xl mt-4 mb-4">
                    <span className="font-bold">Thời Gian Kết Thúc:</span>{" "}
                    {dayjs(order.endTime).format("HH:mm DD/MM/YYYY")}
                  </p>
                  <p className="text-xl mt-4 mb-4">
                    <span className="font-bold">Giá Thuê:</span>{" "}
                    {order.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <img src={order.bike_image} alt="bike" />
              </div>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded flex justify-between"
                onClick={() => reportBike(order.bike_id)}
              >
                Report
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerRentedBike;
