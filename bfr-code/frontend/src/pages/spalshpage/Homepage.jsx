import React from "react";
import splashpage_bg from "../../assets/images/splashpage-bg.jpg";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <header className="fixed  w-full px-2 md:px-4 h-12 bg-white">
        <div className="flex items-center justify-between h-12 ">
          <div className="flex items-center h-full">
            <span className="text-2xl font-bold" style={{ color: "#6439ff" }}>
              Bike For Rent
            </span>
          </div>
          <div className="flex items-center space-x-4 ">
            <Link to="auth/signup" className="-ml-2">
              Đăng ký
            </Link>
            <Link to="auth/login" className="-mr-4">
              Đăng nhập
            </Link>
          </div>
        </div>
      </header>
      <div
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url(${splashpage_bg})`,
        }}
      >
        <div className="items-center justify-center absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold" style={{ color: "#fff" }}>
            Bạn muốn thuê xe đạp?
          </h1>
          <h1 className="mt-4 text-xl" style={{ color: "#f0f0f0" }}>
            Bạn muốn tìm những chiếc xe đạp để phục vụ nhu cầu của mình nhưng
            không biết địa chỉ thuê xe uy tín?
          </h1>
          <h1 className="mt-2 text-xl">
            Hãy đến với{" "}
            <span style={{ color: "#6439ff" }} className="font-bold text-4xl">
              Bike For Rent{" "}
            </span>
            , nơi kết nối những cửa hàng thuê xe với các bạn
          </h1>

          <Link to={"auth/login?form=customer"}>
            <h1
              className="mt-20 text-4xl font-bold"
              style={{ color: "#6439ff" }}
            >
              Thuê xe ngay
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
