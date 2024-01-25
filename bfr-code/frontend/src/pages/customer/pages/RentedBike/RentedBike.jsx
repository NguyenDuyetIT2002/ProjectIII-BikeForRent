import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import axiosConfig from "../../axiosConfig";
import dayjs from "dayjs";

const CustomerRentedBike = () => {
  const userInfo = useSelector((state) => state.customer.customerInfo);
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosConfig.get(
        `/getYourRentedBike/${userInfo._id}`
      );
      if (response.status === 200) {
        setOrders(response.data.data);
      } else {
        console.error("Error fetching rented bikes:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo._id) {
      fetchData();
    }
  }, [userInfo]);

  return (
    <div className="flex h-screen">
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
                    {dayjs(order.startTime).format("DD/MM/YYYY HH:mm")}
                  </p>
                  <p className="text-xl mt-4 mb-4">
                    <span className="font-bold">Thời Gian Kết Thúc:</span>{" "}
                    {dayjs(order.endTime).format("DD/MM/YYYY HH:mm")}
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
              <button className="bg-blue-500 text-white px-2 py-1 rounded flex justify-between">
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
