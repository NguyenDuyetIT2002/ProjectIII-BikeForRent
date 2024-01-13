import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar">
      <div className="logo">Bike For Rent</div>
      <div className="avatar-wrapper">
        <img
          className="avatar"
          src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt="User Avatar"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className="dropdown">
            <Link to="/customer/features" style={{ textDecoration: "none" }}>
                <div className="dropdown-item">Tính năng</div>
            </Link>
            <div className="divider"></div>
            <div className="dropdown-item">Log out</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;