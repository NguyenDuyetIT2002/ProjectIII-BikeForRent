import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
        <div className="flex items-center space-x-4">
          <Link to="/auth/signup" className="-ml-2">
            Đăng ký
          </Link>
          <Link to="/auth/login" className="-mr-4">
            Đăng nhập
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
