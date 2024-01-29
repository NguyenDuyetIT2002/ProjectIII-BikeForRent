import React from "react";
import SideNavbar from "../components/SideNavbar";
import { Box } from "@mui/material";
import axiosConfig from "../axiosConfig";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { showToast } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";
import { getManagerToken } from "../../../utils/localStorage";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

const Orderspage = () => {
  const [orderList, setOrderList] = useState([]);
  const [pendingOrderList, setPendingOrderList] = useState([]);
  const [acceptedOrderList, setAcceptedOrderList] = useState([]);
  const [expiredOrderList, setExpiredOrderList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState(orderList);

  const [selectedType, setSelectedType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const manager_id = useSelector((state) => {
    if (state.manager.managerInfo) return state.manager.managerInfo._id;
    return "none";
  });
  const navigate = useNavigate();

  async function getOrders() {
    setIsLoading(true);
    try {
      const response = await axiosConfig.get(`/getOrdersBy/${manager_id}`);

      setOrderList(response.data.data);
      setFilteredOrders(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Get all orders failed: ", error);
    }
  }

  async function getPendingOrders() {
    try {
      const response = await axiosConfig.get(
        `/getPendingOrdersBy/${manager_id}`
      );
      setPendingOrderList(response.data.data);
    } catch (error) {
      console.log("Get pending orders failed: ", error);
    }
  }

  async function getAcceptedOrders() {
    try {
      const response = await axiosConfig.get(
        `/getAcceptedOrdersBy/${manager_id}`
      );
      setAcceptedOrderList(response.data.data);
    } catch (error) {
      console.log("Get accepted orders failed: ", error);
    }
  }

  async function getAllLatestIncompleteOrder() {
    try {
      const response = await axiosConfig.get(
        `/getAllLatestIncompleteOrdersBy/${manager_id}`
      );
      setExpiredOrderList(response.data.data);
    } catch (error) {
      console.log("Get incomplete orders failed: ", error);
    }
  }

  const acceptOrder = async (orderID) => {
    try {
      const response = await axiosConfig.post(`/acceptOrder/${orderID}`);
      if (response.status === 200) {
        showToast("success", response.data.message);
        const updatedPendingOrders = pendingOrderList.filter(
          (order) => order._id !== orderID
        );
        setPendingOrderList(updatedPendingOrders);
        if (selectedType === "Pending Order") {
          setFilteredOrders(updatedPendingOrders);
        }
      }
    } catch (error) {
      showToast("error", error.response.data.message);
    }
  };

  const completeOrder = async (orderID) => {
    try {
      const response = await axiosConfig.post(`/completeOrder/${orderID}`);
      if (response.status === 200) {
        showToast("success", response.data.message);
        const updatedAcceptedOrders = acceptedOrderList.filter(
          (order) => order._id !== orderID
        );
        setAcceptedOrderList(updatedAcceptedOrders);
        if (selectedType === "Accepted Order") {
          setFilteredOrders(updatedAcceptedOrders);
        }
      }
    } catch (error) {
      showToast("error", error.response.data.message);
    }
  };

  const banCustomer = async (customerID) => {
    try {
      const response = await axiosConfig.post(
        `/requestBanCustomer/${customerID}`
      );
      if (response.status === 200) {
        showToast("success", response.data.message);
      }
    } catch (error) {
      showToast("error", error.response.data.message);
    }
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);

    if (type === "") {
      // If no type selected, show all bikes
      setFilteredOrders(orderList);
    }
    if (type === "Pending Order") {
      // If no type selected, show all bikes
      setFilteredOrders(pendingOrderList);
    }
    if (type === "Accepted Order") {
      // If no type selected, show all bikes
      setFilteredOrders(acceptedOrderList);
    }
    if (type === "Expired Order") {
      // If no type selected, show all bikes
      setFilteredOrders(expiredOrderList);
    }
    console.log(filteredOrders);
  };

  useEffect(() => {
    if (getManagerToken() == null) {
      navigate('/auth/login?form="manager"');
    }
    getOrders();
    getAcceptedOrders();
    getPendingOrders();
    getAllLatestIncompleteOrder();
  }, []);

  const columns = [
    { field: "customer_name", headerName: "Tên khách hàng", width: 130 },
    { field: "bike_name", headerName: "Tên xe", width: 130 },
    {
      field: "bike_image",
      headerName: "Hình Ảnh",
      width: 100,
      renderCell: (params) => (
        <img src={params.value} alt="bike" className="w-20" />
      ),
    },
    { field: "price", headerName: "Giá", width: 80 },
    { field: "status", headerName: "Trạng thái", width: 80 },
    {
      field: "startTime",
      headerName: "Thời gian bắt đầu",
      width: 180,
      valueGetter: (params) =>
        dayjs(params.row.startTime).format("HH:mm:ss DD/MM/YYYY"),
    },
    {
      field: "endTime",
      headerName: "Thời gian trả",
      width: 180,
      valueGetter: (params) =>
        dayjs(params.row.endTime).format("HH:mm:ss DD/MM/YYYY"),
    },
    {
      field: "orderTime",
      headerName: "Thời gian đặt",
      width: 180,
      valueGetter: (params) =>
        dayjs(params.row.orderTime).format("HH:mm:ss DD/MM/YYYY"),
    },
    {
      field: "actions",
      headerName: "Hành động",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        if (selectedType === "Pending Order") {
          return (
            <button
              onClick={() => acceptOrder(params.row._id)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Chấp nhận
            </button>
          );
        }
        if (selectedType === "Accepted Order") {
          return (
            <button
              onClick={() => completeOrder(params.row._id)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Hoàn thành
            </button>
          );
        }
        if (selectedType === "Expired Order") {
          return (
            <button
              onClick={() => banCustomer(params.row.customer_id)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Yêu cầu khóa
            </button>
          );
        }
        return null;
      },
    },
  ];

  return (
    <div style={{ background: "linear-gradient(to right, #f2e2e2, #f0f0f0)" }}>
      <Box sx={{ display: "flex h-screen" }}>
        <SideNavbar />
        <div className="container p-8">
          <h1 className="text-5xl mb-10">Danh sách xe</h1>
          <Select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Select type" }}
          >
            <MenuItem value="" disabled>
              Lọc theo loại
            </MenuItem>
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="Pending Order">Đơn chờ duyệt</MenuItem>
            <MenuItem value="Accepted Order">Đơn chờ hoàn thành</MenuItem>
            <MenuItem value="Expired Order">Đơn quá hạn</MenuItem>
          </Select>

          <div style={{ height: 400, width: "84%" }}>
            <DataGrid
              rows={filteredOrders}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row._id}
              initialState={{
                ...filteredOrders.initialState,
                pagination: { paginationModel: { pageSize: 7 } },
              }}
              pageSizeOptions={[10, 15, 20]}
              loading={isLoading}
            />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Orderspage;
