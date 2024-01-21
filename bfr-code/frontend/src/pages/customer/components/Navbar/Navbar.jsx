import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="fixed w-full px-2 md:px-4 h-12 bg-white">
    <div className="flex items-center justify-between h-12">
      <div className="flex items-center h-full">
        <Link
          to={"/"}
          className="text-2xl font-bold"
          style={{ color: "#6439ff" }}
        >
          Bike For Rent
        </Link>
      </div>

      <div className="avatar-wrapper">
        <img
          className="avatar"
          src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/500_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
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
  </header>


    // <div className="navbar">
    //   <Link
    //         to={"/customer/homepage"}
    //         className="text-2xl font-bold"
    //         style={{ color: "#6439ff" }}
    //       >
    //         Bike For Rent
    //     </Link>

    //   <div className="avatar-wrapper">
    //     <img
    //       className="avatar"
    //       src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    //       alt="User Avatar"
    //       onClick={toggleDropdown}
    //     />
    //     {isDropdownOpen && (
    //       <div className="dropdown">
    //         <Link to="/customer/features" style={{ textDecoration: "none" }}>
    //             <div className="dropdown-item">Tính năng</div>
    //         </Link>
    //         <div className="divider"></div>
    //         <div className="dropdown-item">Log out</div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default Navbar;