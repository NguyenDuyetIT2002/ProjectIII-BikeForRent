import React from 'react';
import logo from '../../../logo.svg';
import './homepage.css';

const CustomerHomePage = () => {
  const handleLogout = (event) => {
    const selectedOption = event.target.value;
    // Xử lý đăng xuất dựa trên option được chọn
    if (selectedOption === 'logout') {
      // Ví dụ: redirect đến trang đăng xuất
      window.location.href = '/logout';
    } else if (selectedOption === 'profile') {
      window.location.href = '/profile';
      // ...
    }
    // Thêm các trường hợp xử lý cho các option khác nếu cần thiết
  };

  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url('../../../../public/hinh-nen-mau-xanh-ngoc.jpg')` }}>
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <h1 className="text-xl font-bold ml-4">Customer Navbar</h1>
          </div>
          <div className="relative">
            {/* Dropdown */}
            <select
              onChange={handleLogout}
              className="block appearance-none w-full bg-blue-600 text-white border border-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="" className="bg-blue-400 text-white">Dropdown Menu</option>
              <option value="profile" className="bg-blue-400 text-white">Profile</option>
              <option value="settings" className="bg-blue-400 text-white">List of rented bikes</option>
              <option value="logout" className="bg-blue-400 text-white">Logout</option>
              {/* Thêm các option khác nếu cần thiết */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>
      {/* Middle Button */}
      <div className="flex justify-center items-center h-screen mb-5">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Rent Bike
        </button>
      </div>
    </div>
  );
};

export default CustomerHomePage;
