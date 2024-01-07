import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import BlockIcon from '@mui/icons-material/Block';
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
          <p className="title">MAIN</p>
          <Link to="/admin/homepage" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/admin/acceptmanager" style={{ textDecoration: "none" }}>
            <li>
              <PersonAddAltIcon className="icon" />
              <span>Accept Manager</span>
            </li>
          </Link>
          <Link to="/admin/banningusers" style={{ textDecoration: "none" }}>
            <li>
              <PersonAddDisabledIcon className="icon" />
              <span>Banning User</span>
            </li>
          </Link>
          <Link to="/admin/banningbike" style={{ textDecoration: "none" }}>
            <li>
              <BlockIcon className="icon" />
              <span>Banning Bike</span>
            </li>
          </Link>
          <Link to="/admin/openningbike" style={{ textDecoration: "none" }}>
            <li>
              <TwoWheelerOutlinedIcon className="icon" />
              <span>Opnening Bike</span>
            </li>
          </Link>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
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
