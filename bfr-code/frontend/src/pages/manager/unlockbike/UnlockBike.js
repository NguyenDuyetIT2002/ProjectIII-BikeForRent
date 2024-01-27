import React from "react";
import SideNavbar from "../components/SideNavbar";
import axiosConfig from "../axiosConfig";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { ImagetoBase64 } from "../ultility/ImagetoBase64";
import { showToast } from "../../../utils/toast";

const UnlockBike = () => {
  const [bikes, setBikes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);
  const managerInfo = useSelector((state) => state.manager.managerInfo);
  const [inputs, setInputs] = useState({
    bikeImage: "",
    reason: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const data = await ImagetoBase64(file);
      setInputs((prevInputs) => ({ ...prevInputs, bikeImage: data }));
    }
  };
  const fetchData = async () => {
    try {
      const response = await axiosConfig.get(
        `/getBlockedBikes/${managerInfo._id}`
      );
      if (response.status === 200) {
        setBikes(response.data.data);
      }
    } catch (error) {
      if (error.response) {
        showToast("error", error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUnlockRequest = (bike) => {
    setSelectedBike(bike);
    setIsModalOpen(true);
    setInputs([]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBike(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosConfig.post("/sendUBRequest", {
        bike_id: selectedBike._id,
        reason: inputs.reason,
        image: inputs.bikeImage,
      });
      if (response.status === 200) {
        showToast("success", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        showToast("error", error.response.data.message);
      }
    }
    handleCloseModal();
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <div className="flex flex-col flex-wrap pl-20 pt-20 w-full">
          <h1 className="text-5xl mb-10">Danh sách xe bị khóa</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    STT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tên xe
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hình ảnh
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {bikes.map((bike, index) => (
                  <tr key={bike._id} className="bg-white border-b">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{bike.name}</td>
                    <td className="px-6 py-4">
                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="w-40 h-25 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleUnlockRequest(bike)}
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Yêu cầu mở khóa xe
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        className="flex items-center justify-center" // Thêm class để canh giữa màn hình
      >
        <Fade in={isModalOpen}>
          <Box className="bg-white p-4 max-w-sm mx-auto my-auto rounded">
            <h2 id="transition-modal-title" className="text-lg font-bold mb-2">
              Yêu cầu mở khóa xe
            </h2>
            <form onSubmit={handleSubmit}>
              <p id="transition-modal-description" className="mb-4">
                Xe: {selectedBike?.name}
              </p>
              <input
                type="text"
                name="reason"
                placeholder="Lý do mở khóa"
                value={inputs.reason}
                onChange={handleChange}
                className="p-2 border mb-4 w-full"
              />
              <input type="file" className="mb-4" onChange={uploadImage} />
              {inputs.bikeImage && (
                <img
                  src={inputs.bikeImage}
                  alt="Preview"
                  className="w-40 h-25 object-cover mb-4"
                />
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Gửi yêu cầu
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default UnlockBike;
