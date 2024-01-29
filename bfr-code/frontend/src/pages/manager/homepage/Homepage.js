import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axiosConfig from "../axiosConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toast";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import SideNavbar from "../components/SideNavbar";

const Homepage = () => {
  const [bikesList, setBikesList] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const manager_id = useSelector(
    (state) => state.manager.managerInfo?._id || "none"
  );

  useEffect(() => {
    getBikes();
  }, []);

  async function getBikes() {
    try {
      setIsLoading(true);
      const response = await axiosConfig.get(`/getBikes/${manager_id}`);
      if (response.status === 200) {
        setBikesList(response.data.data);
        setFilteredBikes(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      showToast("error", error.response.data.message);
      setIsLoading(false);
    }
  }

  const deleteBike = async (bikeID) => {
    try {
      const response = await axiosConfig.delete(`/deleteBike/${bikeID}`);
      setFilteredBikes(filteredBikes.filter((item) => item._id !== bikeID));
      showToast("success", "Bike deleted successfully");
    } catch (error) {
      showToast("error", "Failed to delete bike");
    }
  };

  const handleEditClick = (bikeInfo) => {
    navigate(`/manager/editbike`, { state: { bikeInfo } });
  };

  const handleOpen = (bike) => {
    setSelectedBike(bike);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleTypeChange = (type) => {
    setSelectedType(type);

    if (type === "") {
      // If no type selected, show all bikes
      setFilteredBikes(bikesList);
    } else if (type === "Khác") {
      // If "Khác" selected, filter out bikes with known types
      const filtered = bikesList.filter(
        (bike) =>
          bike.type !== "Xe thể thao" &&
          bike.type !== "Xe đạp đua" &&
          bike.type !== "Xe đường phố"
      );
      setFilteredBikes(filtered);
    } else {
      // Filter bikes based on selected type
      const filtered = bikesList.filter((bike) => bike.type === type);
      setFilteredBikes(filtered);
    }
  };

  const columns = [
    { field: "name", headerName: "Tên", width: 150 },
    { field: "type", headerName: "Loại", width: 150 },
    {
      field: "image",
      headerName: "Hình Ảnh",
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="bike" className="w-20" />
      ),
    },
    { field: "status", headerName: "Trạng thái", width: 110 },
    { field: "price", headerName: "Giá thuê", width: 110 },
    { field: "description", headerName: "Mô tả", width: 100 },
    { field: "banRequestAmount", headerName: "Reports", width: 80 },
    {
      field: "viewDetails",
      headerName: "Xem chi tiết",
      width: 120,
      renderCell: (params) => (
        <button
          className="bg-green-500 text-white px-2 py-1 rounded"
          onClick={() => handleOpen(params.row)}
        >
          Xem Chi Tiết
        </button>
      ),
    },
    {
      field: "editAction",
      headerName: "Chỉnh sửa",
      width: 100,
      renderCell: (params) => (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEditClick(params.row)}
        >
          Chỉnh sửa
        </button>
      ),
    },
    {
      field: "deleteAction",
      headerName: "Xóa",
      width: 70,
      renderCell: (params) => (
        <button
          className="bg-red-400 text-white px-2 py-1 rounded"
          onClick={() => deleteBike(params.row._id)}
        >
          Xóa
        </button>
      ),
    },
  ];

  return (
    <Box
      sx={{ display: "flex h-screen" }}
      style={{ background: "linear-gradient(to right, #f2e2e2, #f0f0f0)" }}
    >
      <SideNavbar />
      <div className="container p-8">
        <h1 className="text-5xl mb-10">Danh sách xe</h1>
        <div className="mb-4 flex items-center">
          <h1 className="text-xl mr-4">Lọc</h1>
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
            <MenuItem value="Xe thể thao">Xe thể thao</MenuItem>
            <MenuItem value="Xe đạp đua">Xe đạp đua</MenuItem>
            <MenuItem value="Xe đường phố">Xe đường phố</MenuItem>
            <MenuItem value="Khác">Khác</MenuItem>
          </Select>
        </div>
        <div style={{ height: 500, width: "85%" }}>
          <DataGrid
            rows={filteredBikes}
            getRowId={(row) => row._id}
            columns={columns}
            initialState={{
              ...filteredBikes.initialState,
              pagination: { paginationModel: { pageSize: 7 } },
            }}
            pageSizeOptions={[10, 15, 20]}
            checkboxSelection
            disableSelectionOnClick
            loading={isLoading}
          />
        </div>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 400,
              overflow: "auto",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            {selectedBike && (
              <div className="mb-2 mt-2">
                <img src={selectedBike.image} alt="bike" className="" />
                <h2 className="font-semibold text-xl">
                  Tên:{" "}
                  <span className="font-normal text-base">
                    {selectedBike.name}
                  </span>
                </h2>
                <h2 className="font-semibold text-xl">
                  Loại:{" "}
                  <span className="font-normal text-base">
                    {selectedBike.type}
                  </span>
                </h2>
                <h2 className="font-semibold text-xl">
                  Trạng thái:{" "}
                  <span className="font-normal text-base">
                    {selectedBike.status}
                  </span>
                </h2>
                <h2 className="font-semibold text-xl">
                  Giá thuê:{" "}
                  <span className="font-normal text-base">
                    {selectedBike.price}/h
                  </span>
                </h2>
                <h2 className="font-semibold text-xl">
                  Mô tả:{" "}
                  <span className="font-normal text-base">
                    {selectedBike.description}
                  </span>
                </h2>
                <h2 className="font-semibold text-xl">
                  Reports:{" "}
                  <span className="font-normal text-base">
                    {selectedBike.banRequestAmount}
                  </span>
                </h2>
              </div>
            )}
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default Homepage;
