import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosConfig from "../../axiosConfig";
import Navbar from "../../components/Navbar/Navbar";
import Background from "../../components/Background/Background";
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
dayjs.extend(utc);

const RentBike = () => {
  const location = useLocation();
  const selectedStore = location.state?.selectedStore;
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());

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
  const handleOpen = (imageUrl) => {
    setModalImage(imageUrl);
    setOpen(true);
  };
  const customerInfo = useSelector((state) => state.customer.customerInfo);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConfig.get(`/getBikes/${selectedStore}`);
        if (response.status === 200) {
          setBikes(response.data.data);
        } else {
          console.error("Error fetching bikes:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (selectedStore) {
      fetchData();
    }
  }, [selectedStore]);

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

        if (response.data.code === 200) {
          showToast("success", response.data.message);
          handleRentModalClose();
        }
      } catch (error) {
        showToast("error", error.response.data.message);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="container mx-auto p-14">
        <h2 className="text-3xl font-bold mb-4">Thông tin các xe</h2>
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Tên Xe</th>
              <th className="py-2 px-4 border-b">Hình Ảnh</th>
              <th className="py-2 px-4 border-b">Loại Xe</th>
              <th className="py-2 px-4 border-b">Mô Tả</th>
              <th className="py-2 px-4 border-b">Giá Thuê</th>
              <th className="py-2 px-4 border-b">Thuê Xe</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike) => (
              <tr key={bike._id} onClick={() => handleOpen(bike.image)}>
                <td className="py-2 px-4 border-b">{bike.name}</td>
                <td className="py-2 px-4 border-b">
                  <img src={bike.image} alt="bike" className="w-20" />
                </td>
                <td className="py-2 px-4 border-b">{bike.type}</td>
                <td className="py-2 px-4 border-b">{bike.description}</td>
                <td className="py-2 px-4 border-b">{bike.price} đồng</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRentClick(bike)}
                  >
                    Thuê Xe
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_image}>
            <img src={modalImage} alt="License" style={{ width: "100%" }} />
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
