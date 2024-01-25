import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import BlockIcon from "@mui/icons-material/Block";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/managerSlice";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAdminToken, getAdminToken } from "../../../../utils/localStorage";

const Sidebar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (getAdminToken() == null) {
      navigate('/auth/login?form="admin"');
    }
  });
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    clearAdminToken();
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin/homepage" style={{ textDecoration: "none" }}>
          <span className="logo">Bike For Rent</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/admin/homepage" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/admin/acceptmanager" style={{ textDecoration: "none" }}>
            <li>
              <PersonAddAltIcon className="icon" />
              <span>Phê duyệt tài khoản chủ cửa hàng</span>
            </li>
          </Link>
          <Link to="/admin/banningusers" style={{ textDecoration: "none" }}>
            <li>
              <PersonAddDisabledIcon className="icon" />
              <span>Khóa tài khoản khách hàng</span>
            </li>
          </Link>
          <Link to="/admin/banningbike" style={{ textDecoration: "none" }}>
            <li>
              <BlockIcon className="icon" />
              <span>Khóa xe</span>
            </li>
          </Link>
          <Link to="/admin/openningbike" style={{ textDecoration: "none" }}>
            <li>
              <DirectionsBikeIcon className="icon" />
              <span>Mở khóa xe</span>
            </li>
          </Link>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={handleLogout}
          >
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
