// ChooseLocation.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChooseLocation.css'; // Import CSS file
import Navbar from '../../components/Navbar/Navbar';
import Background from '../../components/Background/Background';
import Dropdown from '../../components/Dropdown/Dropdown';

const ChooseLocation = () => {
  const [districtOptions] = useState(['District A', 'District B']);
  const [storeOptions] = useState(['Store 1', 'Store 2']);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [chosenBike, setChosenBike] = useState(null);

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
  };

  const handleStoreChange = (selectedOption) => {
    setChosenBike(selectedOption);
  };

  const handleNext = () => {
    if (chosenBike) {
      // Proceed to the next step
    } else {
      alert('Vui lòng chọn cửa hàng trước khi tiếp tục.');
    }
  };

  return (
    <>
      <Navbar />
      <Background />
      <div className="container">
        <div className="dropdown-group">
          <Dropdown
            options={districtOptions}
            value={selectedDistrict}
            onChange={handleDistrictChange}
            placeholder="Chọn Quận/Huyện"
          />
          <Dropdown
            options={storeOptions}
            value={chosenBike}
            onChange={handleStoreChange}
            placeholder="Chọn Cửa Hàng"
          />
        </div>
        {/* Sử dụng nút button để chuyển đến trang thuê xe */}
        <div className="button-group">
          <Link to={`/rent_bike?address=${chosenBike && encodeURIComponent(chosenBike.address)}`}>
            <button className="next-button" disabled={!chosenBike} onClick={handleNext}>
              Tiếp Theo
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ChooseLocation;
