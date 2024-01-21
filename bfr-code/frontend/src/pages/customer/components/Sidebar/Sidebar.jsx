// Sidebar.jsx
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BlockIcon from "@mui/icons-material/Block";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-white w-64 h-screen flex flex-col">
      <div className="text-center p-4">
        <Link to="/" className="text-2xl font-bold text-black no-underline">
          Bike For Rent
        </Link>
      </div>
      <hr className="border-t border-white" />
      <div className="flex-1">
        <ul className="list-none p-0">
          <Link to="/customer/homepage" className="text-black no-underline">
            <li className="flex items-center p-4 hover:bg-gray-200">
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/customer/profile" className="text-black no-underline">
            <li className="flex items-center p-4 hover:bg-gray-200">
              <BlockIcon className="icon" />
              <span>Report Rented Bike</span>
            </li>
          </Link>
          <Link to="/customer/profile" className="text-black no-underline">
            <li className="flex items-center p-4 hover:bg-gray-200">
              <DirectionsBikeIcon className="icon" />
              <span>List of Rented Bike</span>
            </li>
          </Link>
          <Link to="/customer/profile" className="text-black no-underline">
            <li className="flex items-center p-4 hover:bg-gray-200">
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li className="flex items-center p-4 hover:bg-gray-200">
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
