// Sidebar.jsx
import React from "react";

import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/customerSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
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
          <Link
            to="/customer/chooselocation"
            className="text-black no-underline"
          >
            <li className="flex items-center p-4 hover:bg-gray-200">
              <DirectionsBikeIcon className="icon" />
              <span>Thuê xe</span>
            </li>
          </Link>
          <Link to="/customer/rentedbike" className="text-black no-underline">
            <li className="flex items-center p-4 hover:bg-gray-200">
              <DirectionsBikeIcon className="icon" />
              <span>Xe bạn đã thuê</span>
            </li>
          </Link>
          <Link to="/customer/profile" className="text-black no-underline">
            <li className="flex items-center p-4 hover:bg-gray-200">
              <AccountCircleOutlinedIcon className="icon" />
              <span>Tài khoản</span>
            </li>
          </Link>
          <li
            className="flex items-center p-4 hover:bg-gray-200"
            onClick={handleLogout}
          >
            <ExitToAppIcon className="icon" />
            <span>Đăng xuất</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
