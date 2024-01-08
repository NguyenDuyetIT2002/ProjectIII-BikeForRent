// CustomerProfile.js
import React, { useState } from 'react';
import logo from '../../../logo.svg';
import './profile.css';

const CustomerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    // Xử lý khi nút chỉnh sửa được nhấp
    setIsEditing(!isEditing);
  };

  return (
    <>
    <header className="bg-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <h1 className="text-xl font-bold ml-4">Customer Navbar</h1>
          </div>
        </div>
      </header>
    <div className="container mx-auto mt-10">
      

      <div className="flex justify-end">
        <button
          onClick={handleEditClick}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Các ô lớn */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        {isEditing ? (
          /* Giao diện chỉnh sửa */
          <>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                className="w-full border rounded p-2"
              />
            </div>
            {/* Thêm các trường khác nếu cần thiết */}
          </>
        ) : (
          /* Giao diện hiển thị thông tin */
          <>
            <div>
              <p><strong>First Name:</strong> John</p>
            </div>

            <div>
              <p><strong>Last Name:</strong> Doe</p>
            </div>
            {/* Hiển thị các trường thông tin khác */}
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default CustomerProfile;
