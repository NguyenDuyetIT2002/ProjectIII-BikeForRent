import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosConfig from "../../axiosConfig";
import Navbar from "../../components/Navbar/Navbar";
import Background from "../../components/Background/Background";

const RentBike = () => {
  const location = useLocation();
  const selectedStore = location.state?.selectedStore;
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);

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
    // Thực hiện các xử lý cần thiết khi người dùng ấn nút "Thuê Xe"
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Background />
      <div className="container mx-auto p-14">
        <h2 className="text-3xl font-bold mb-4">Thông tin các xe</h2>
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Tên Xe</th>
              <th className="py-2 px-4 border-b">Loại Xe</th>
              <th className="py-2 px-4 border-b">Mô Tả</th>
              <th className="py-2 px-4 border-b">Giá Thuê</th>
              <th className="py-2 px-4 border-b">Thuê Xe</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike) => (
              <tr key={bike._id}>
                <td className="py-2 px-4 border-b">{bike.name}</td>
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
      </div>
    </div>
  );
};

export default RentBike;
