import React from "react";
import splashpage_bg from "../../assets/images/splashpage-bg.jpg";
import { Link } from "react-router-dom";
import Header from "./Header";

const Homepage = () => {
  return (
    <div>
      <Header />
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
