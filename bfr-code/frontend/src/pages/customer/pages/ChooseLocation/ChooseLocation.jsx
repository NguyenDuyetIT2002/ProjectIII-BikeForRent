// ChooseLocation.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Background from '../../components/Background/Background';
import HanoiProvince from "../../../../assets/HaNoiProvince.json";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../axiosConfig";

const ChooseLocation = () => {
  const [chosenBike, setChosenBike] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    province: "",
  });
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // Call API to get the list of stores when the district changes
    try {
      const response = await fetch(`http://localhost:8080/customer/getStoreByProvince/${value}`);
      const data = await response.json();
      if (response.ok) {
        setStores(data);
        setSelectedStore("");
      } else {
        console.error("Error fetching stores:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStoreChange = (selectedOption) => {
    setChosenBike(selectedOption);
  };

  const handleContinueClick = async () => {
    if (selectedStore) {
      try {
        // Call API getAllBike with the selected manager's _id
        const response = await fetch(`http://localhost:8080/customer/getBikes/${selectedStore._id}`);
        const data = await response.json();
        if (response.ok) {
          // Handle the data as needed
        } else {
          console.error("Error fetching bikes:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert('Vui lòng chọn cửa hàng trước khi tiếp tục.');
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
            onChange={(e) => setSelectedStore(e.target.value)}
            required
            className="border rounded-md py-2 px-3 w-full"
          >
            <option value="">Chọn cửa hàng</option>
            {stores.map((store) => (
              <option key={store._id} value={store.address}>
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
