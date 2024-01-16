// Sidebar.jsx
import React from "react";
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import TwoWheelerOutlinedIcon from "@mui/icons-material/TwoWheelerOutlined";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import BlockIcon from "@mui/icons-material/Block";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Bike For Rent</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/customer/homepage" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/customer/profile" style={{ textDecoration: "none" }}>
            <li>
              <BlockIcon className="icon" />
              <span>Report Rented Bike</span>
            </li>
          </Link>
          <Link to="/customer/profile" style={{ textDecoration: "none" }}>
            <li>
              <DirectionsBikeIcon className="icon" />
              <span>List of Rented Bike</span>
            </li>
          </Link>
          <Link to="/customer/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
