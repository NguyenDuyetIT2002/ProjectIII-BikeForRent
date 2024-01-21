// ChooseLocation.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Background from "../../components/Background/Background";
import HanoiProvince from "../../../../assets/HaNoiProvince.json";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../axiosConfig";

const ChooseLocation = () => {
  const [chosenBike, setChosenBike] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    province: "",
  });
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const navigate = useNavigate();

  const useEffect = () => {};
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    try {
      const response = await axiosConfig.get(`/getStoreByProvince/${value}`);
      if (response.status === 200) {
        console.log(response.data.data);
        setStores(response.data.data);
      } else {
        console.error("Error fetching stores:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
    }
  };

  const handleStoreChange = (e) => {
    console.log(e.target.value);
    const selectedStoreValue = e.target.value;
    setSelectedStore(selectedStoreValue);
    console.log(selectedStore);

    // Check if a store is selected (not the placeholder option)
    if (selectedStoreValue) {
      setChosenBike(true); // Enable the "Tiếp Theo" button
    } else {
      setChosenBike(false); // Disable the "Tiếp Theo" button
    }
  };

  const handleContinueClick = async () => {
    if (selectedStore) {
      try {
        // Call API getAllBike with the selected manager's
        const response = await axiosConfig.get(`/getBikes/${selectedStore}`);
        if (response.status === 200) {
          console.log(response.data.data);
        } else {
          console.error("Error fetching bikes:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Vui lòng chọn cửa hàng trước khi tiếp tục.");
    }
  };

  return (
    <>
      <Navbar />
      <Background />
      <div className="container mx-auto flex flex-col items-center justify-center h-screen">
        <div className="mb-4">
          <label
            htmlFor="province"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Quận/Huyện
          </label>
          <select
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
            className="border rounded-md py-2 px-3 w-full"
          >
            <option value="">Chọn quận/huyện</option>
            {HanoiProvince.map((province, index) => (
              <option key={index} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for selecting store */}
        <div className="mb-4">
          <label
            htmlFor="store"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Cửa hàng
          </label>
          <select
            id="store"
            name="store"
            value={selectedStore}
            onChange={handleStoreChange}
            required
            className="border rounded-md py-2 px-3 w-full"
          >
            <option value="">Chọn cửa hàng</option>
            {stores.map((store) => (
              <option key={store._id} value={store._id}>
                {store.address}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <Link to={"/customer/homepage"}>
            <button className="bg-gray-300 text-gray-700 rounded-md py-2 px-4">
              Quay lại
            </button>
          </Link>

          <button
            type="submit" // Ensure it's a submit button to trigger onSubmit
            className="bg-blue-500 text-white rounded-md py-2 px-4 disabled:opacity-50"
            disabled={!chosenBike}
            onClick={handleContinueClick}
          >
            Tiếp Theo
          </button>
        </div>
      </div>
    </>
  );
};

export default ChooseLocation;
