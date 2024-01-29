import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BlockIcon from "@mui/icons-material/Block";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../../redux/managerSlice";

const SideNavbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className="sidebar"
      style={{ background: "linear-gradient(to right, #f2e2e2, #f0f0f0)" }}
    >
      <div className="top">
        <Link to="" style={{ textDecoration: "none" }}>
          <span className="logo">Bike For Rent</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/manager/homepage" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Quản lý xe</span>
            </li>
          </Link>
          <Link to="/manager/addbike" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Thêm xe</span>
            </li>
          </Link>
          <Link to="/manager/orders" style={{ textDecoration: "none" }}>
            <li>
              <ListAltIcon className="icon" />
              <span>Đơn thuê xe</span>
            </li>
          </Link>
          <Link to="/manager/unlockbike" style={{ textDecoration: "none" }}>
            <li>
              <BlockIcon className="icon" />
              <span>Xe đang bị khóa</span>
            </li>
          </Link>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={handleLogout}
          >
            <li>
              <ExitToAppIcon className="icon" />
              <span>Đăng xuất</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
