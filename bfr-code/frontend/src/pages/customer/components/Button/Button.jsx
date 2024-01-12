// CenterButton.js
import "./Button.css"
import React from 'react';
import { Link } from "react-router-dom";

const Button = () => {
  return (
    <Link to="/customer/chooselocation">
    <button className="button">Rent Bike</button>
    </Link>
  );
};

export default Button;
