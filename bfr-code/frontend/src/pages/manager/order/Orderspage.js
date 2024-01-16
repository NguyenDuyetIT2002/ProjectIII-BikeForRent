import React from "react";
import SideNavbar from "../components/SideNavbar";
import { Box } from "@mui/material";
import axiosConfig from "../axiosConfig";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OrderInfoContainer from "../components/OrderInfoContainer";
import { showToast } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";
import { getManagerToken } from "../../../utils/localStorage";

const Orderspage = () => {
  const [orderList, setOrderList] = useState([]);
  const [orderType, setOrderType] = useState(0);

  const manager_id = useSelector((state) => {
    if (state.manager.managerInfo) return state.manager.managerInfo._id;
    return "none";
  });
  const navigate = useNavigate();

  async function getOrders() {
    try {
      const response = await axiosConfig.get(`/getOrdersBy/${manager_id}`);
      console.log(response.data.data);
      setOrderType(0);
      setOrderList(response.data.data);
    } catch (error) {
      console.log("Get all orders failed: ", error);
    }
  }

  async function getPendingOrders() {
    try {
      const response = await axiosConfig.get(
        `/getPendingOrdersBy/${manager_id}`
      );
      console.log(response.data.data);
      setOrderType(1);
      setOrderList(response.data.data);
    } catch (error) {
      console.log("Get pending orders failed: ", error);
    }
  }

  async function getAcceptedOrders() {
    try {
      const response = await axiosConfig.get(
        `/getAcceptedOrdersBy/${manager_id}`
      );
      console.log(response.data.data);
      setOrderType(2);
      setOrderList(response.data.data);
    } catch (error) {
      console.log("Get accepted orders failed: ", error);
    }
  }

  const acceptOrder = async (orderID) => {
    try {
      const response = await axiosConfig.post(`/acceptOrder/${orderID}`);
      showToast("success", "Cho thuê xe thành công");
      if (orderType === 0) {
        getOrders();
      } else if (orderType === 1) {
        getPendingOrders();
      }
    } catch (error) {
      showToast("error", "Cho thuê xe thất bại");
    }
  };

  const completeOrder = async (orderID) => {
    try {
      const response = await axiosConfig.post(`/completeOrder/${orderID}`);
      showToast("success", "Hoàn thành thuê xe thành công");
      if (orderType === 0) {
        getOrders();
      } else if (orderType === 2) {
        getAcceptedOrders();
      }
    } catch (error) {
      showToast("error", "Hoàn thành thuê xe không thành công");
    }
  };

  useEffect(() => {
    if (getManagerToken() == null) {
      navigate('/auth/login?form="manager"');
    }
    getOrders();
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <div className="flex flex-col flex-wrap pl-20 pt-20">
          <h1 className="text-5xl mb-10">Orders</h1>
          <div className="flex flex-row space-x-10">
            <button
              onClick={() => {
                getOrders();
              }}
            >
              All orders
            </button>
            <button
              onClick={() => {
                getPendingOrders();
              }}
            >
              Pending orders
            </button>
            <button
              onClick={() => {
                getAcceptedOrders();
              }}
            >
              On-going orders
            </button>
            <button onClick={() => {}}>Expired orders</button>
          </div>
          <div>
            {orderList.map((order) =>
              order.status == "pending" ? (
                <OrderInfoContainer
                  orderInfo={order}
                  handelOnClick={acceptOrder}
                ></OrderInfoContainer>
              ) : order.status == "accepted" ? (
                <OrderInfoContainer
                  orderInfo={order}
                  handelOnClick={completeOrder}
                ></OrderInfoContainer>
              ) : null
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Orderspage;
