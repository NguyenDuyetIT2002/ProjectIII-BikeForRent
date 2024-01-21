import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Background from "../../components/Background/Background";
import Button from "../../components/Button/Button";
import splashpage_bg from "../../../../assets/images/splashpage-bg.jpg";
import { Link } from "react-router-dom";

const HomePageCustomer = () => {
  return (
    <>
      <Navbar />
      <Background />
      {/* <div
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url(${splashpage_bg})`,
        }}
      >
      </div> */}
      <Link to="/customer/chooselocation">
          <button className="button">Rent Bike</button>
    </Link>
    </>
  );
};

export default HomePageCustomer;
