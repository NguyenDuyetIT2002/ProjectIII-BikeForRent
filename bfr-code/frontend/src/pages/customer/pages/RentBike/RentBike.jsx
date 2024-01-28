import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosConfig from "../../axiosConfig";
import { Modal, Box } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import utc from "dayjs/plugin/utc";
import { showToast } from "../../../../utils/toast";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
dayjs.extend(utc);

const RentBike = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedStore = location.state?.selectedStore;
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [selectedType, setSelectedType] = useState("");
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [rentModalOpen, setRentModalOpen] = useState(false);
  const handleRentModalOpen = () => {
    setRentModalOpen(true);
  };

  const handleRentModalClose = () => {
    setRentModalOpen(false);
  };

  const style_image = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const style_choosetime = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleOpen = (bike) => {
    setSelectedBike(bike);
    setOpen(true);
  };
  const customerInfo = useSelector((state) => state.customer.customerInfo);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosConfig.get(`/getBikes/${selectedStore}`);
        if (response.status === 200) {
          setBikes(response.data.data);
          setFilteredBikes(response.data.data);
          setIsLoading(false);
        } else {
          console.error("Error fetching bikes:", response.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    if (selectedStore) {
      fetchData();
    }
  }, []);

  const handleRentClick = (bike) => {
    setSelectedBike(bike);
    handleRentModalOpen();
  };

  const handleStartTimeChange = (newValue) => {
    if (newValue.isBefore(dayjs())) {
      showToast(
        "error",
        "Thời gian mượn không thể nhỏ hơn thời gian hiện tại."
      );
    } else {
      setStartTime(newValue);
    }
  };

  const handleEndTimeChange = (newValue) => {
    if (newValue.isBefore(dayjs())) {
      showToast("error", "Thời gian trả không thể nhỏ hơn thời gian hiện tại.");
    } else {
      setEndTime(newValue);
    }
  };

  const handleRentBike = async () => {
    if (endTime.isBefore(startTime)) {
      showToast("error", "Thời gian trả không thể nhỏ hơn thời gian mượn.");
    } else {
      const startTimeGMT = startTime.utc().format();
      const endTimeGMT = endTime.utc().format();
      try {
        const response = await axiosConfig.post("/rentBike", {
          bike_id: selectedBike._id,
          startTime: startTimeGMT,
          endTime: endTimeGMT,
          customer_id: customerInfo._id,
        });

        if (response.status === 200) {
          showToast("success", response.data.message);
          handleRentModalClose();
          navigate("/customer/rentedBike");
        }
      } catch (error) {
        showToast("error", error.response.data.message);
      }
    }
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);

    if (type === "") {
      // If no type selected, show all bikes
      setFilteredBikes(bikes);
    } else if (type === "Khác") {
      // If "Khác" selected, filter out bikes with known types
      const filtered = bikes.filter(
        (bike) =>
          bike.type !== "Xe thể thao" &&
          bike.type !== "Xe đạp đua" &&
          bike.type !== "Xe đường phố"
      );
      setFilteredBikes(filtered);
    } else {
      // Filter bikes based on selected type
      const filtered = bikes.filter((bike) => bike.type === type);
      setFilteredBikes(filtered);
    }
  };

  const columns = [
    { field: "name", headerName: "Tên Xe", flex: 1 },
    {
      field: "image",
      headerName: "Hình Ảnh",
      flex: 1,
      renderCell: (params) => (
        <img src={params.value} alt="bike" className="w-20" />
      ),
    },
    { field: "type", headerName: "Loại Xe", flex: 1 },
    { field: "description", headerName: "Mô Tả", flex: 1 },
    {
      field: "price",
      headerName: "Giá Thuê",
      flex: 1,
      renderCell: (params) => `${params.value} đồng`,
    },
    {
      field: "viewDetails",
      headerName: "Xem Chi Tiết",
      flex: 1,
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
      field: "action",
      headerName: "Thuê Xe",
      flex: 1,
      renderCell: (params) => (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleRentClick(params.row)}
        >
          Thuê Xe
        </button>
      ),
    },
  ];

  return (
    <div
      className="flex h-screen"
      style={{ background: "linear-gradient(to right, #f2e2e2, #f0f0f0)" }}
    >
      <Sidebar />
      <div className="container p-8">
        <h2 className="text-3xl font-bold mb-4">Thông tin các xe</h2>
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
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={filteredBikes}
            columns={columns}
            pageSize={5}
            checkboxSelection
            getRowId={(row) => row._id}
            initialState={{
              ...filteredBikes.initialState,
              pagination: { paginationModel: { pageSize: 7 } },
            }}
            pageSizeOptions={[10, 15, 20]}
            loading={isLoading}
            sx={{
              border: "1px solid #000000", // Adjust the border color as needed
              borderRadius: "4px", // Adjust the border radius as needed
            }}
          />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_image}>
            {selectedBike && (
              <>
                <img
                  src={selectedBike.image}
                  alt={selectedBike.name}
                  style={{ width: "100%" }}
                />
                <h3 className="font-semibold text-xl mt-4">
                  {selectedBike.name}
                </h3>
                <p className="font-semibold text-xl mt-4">
                  Loại xe:{" "}
                  <span className="font-normal text-l ml-4">
                    {selectedBike.type}
                  </span>
                </p>
                <p className="font-semibold text-xl mt-4">
                  Mô tả:{" "}
                  <span className="font-normal text-l ml-4">
                    {selectedBike.description}
                  </span>
                </p>
                <p className="font-semibold text-xl mt-4">
                  Giá thuê:{" "}
                  <span className="font-normal text-l ml-4">
                    {selectedBike.price} đồng/h
                  </span>
                </p>
              </>
            )}
          </Box>
        </Modal>

        <Modal
          open={rentModalOpen}
          onClose={handleRentModalClose}
          aria-labelledby="rent-modal-title"
          aria-describedby="rent-modal-description"
        >
          <Box sx={style_choosetime}>
            <h2 id="rent-modal-title" className="text-xl font-bold mb-4">
              Thông tin thuê xe
            </h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                <DateTimePicker
                  label="Thời gian mượn"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  renderInput={(props) => <TextField {...props} />}
                />
                <DateTimePicker
                  label="Thời gian trả"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  renderInput={(props) => <TextField {...props} />}
                />
              </DemoContainer>
            </LocalizationProvider>

            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mt-4"
              onClick={handleRentBike}
            >
              Xác nhận Thuê Xe
            </button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default RentBike;
