import React from "react";
import SideNavbar from "../components/SideNavbar";
import { Box } from "@mui/material";
import axiosConfig from "../axiosConfig";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { showToast } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";
import { getManagerToken } from "../../../utils/localStorage";
import PendingOrderContainer from "../components/PendingOrderContainer";
import AcceptedOrderContainer from "../components/AcceptedOrderContainer";
import ExpiredOrderContainer from "../components/ExpiredOrderContainer";

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

  async function getAllLatestIncompleteOrder() {
    try {
      const response = await axiosConfig.get(
        `/getAllLatestIncompleteOrdersBy/${manager_id}`
      );
      setOrderType(3);
      setOrderList(response.data.data);
    } catch (error) {
      console.log("Get incomplete orders failed: ", error);
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

  const banCustomer = async (customerID) => {
    try {
      const response = await axiosConfig.post(`/requestBanCustomer/${customerID}`);
      showToast("success", "Báo cáo người dùng thành công");
    } catch (error) {
      showToast("error", "Báo cáo người dùng thất bại");
    }
  };

  useEffect(() => {
    if (getManagerToken() == null) {
      navigate('/auth/login?form="manager"');
    }
    getPendingOrders();
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <div className="flex flex-col flex-wrap pl-20 pt-20">
          <h1 className="text-5xl mb-10">
            {
              orderType == 1 
              ? "Đơn chờ duyệt"
              : orderType == 2
                ? "Đơn chờ hoàn thành"
                : "Đơn quá hạn"
            }
          </h1>
          <div className="flex flex-row space-x-10">
            <button className="px-5 py-1 hover:bg-violet-200"
              onClick={() => {
                getPendingOrders();
              }}
            >
              Đơn chờ duyệt
            </button>
            <button className="px-5 py-1 hover:bg-violet-200"
              onClick={() => {
                getAcceptedOrders();
              }}
            >
              Đơn chờ hoàn thành
            </button>
            <button className="px-5 py-1 hover:bg-violet-200"
              onClick={() => {
                getAllLatestIncompleteOrder();
              }}
            >
              Đơn quá hạn
            </button>
          </div>
          <div>
            {orderList.map((order) =>
              orderType == 1 ? (
                <PendingOrderContainer
                  orderInfo={order}
                  handelOnClick={acceptOrder}
                ></PendingOrderContainer>
              ) : orderType == 2 ? (
                <AcceptedOrderContainer
                  orderInfo={order}
                  handelOnClick={completeOrder}
                ></AcceptedOrderContainer>
              ) : <ExpiredOrderContainer
                    orderInfo={order}
                    handelOnClick={banCustomer}
                  ></ExpiredOrderContainer>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Orderspage;
