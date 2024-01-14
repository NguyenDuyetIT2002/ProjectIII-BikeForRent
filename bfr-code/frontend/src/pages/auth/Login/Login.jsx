import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomerLoginForm from "./CustomerLoginForm";
import ManagerLoginForm from "./ManagerLoginForm";
import AdminLoginForm from "./AdminLoginForm";

const Login = () => {
  const [activeForm, setActiveForm] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const formType = query.get("form");
    if (formType) {
      setActiveForm(formType);
    }
  }, [location]);

  const handleButtonClick = (form) => {
    setActiveForm(form);
  };

  return (
    <div className="flex h-screen  bg-slate-100 ">
      {/* Left Section - Buttons */}
      <div className="w-1/3 justify-center items-center flex shadow-sm">
        <div
          className="bg-white p-8 rounded shadow-md"
          style={{ maxWidth: "400px" }}
        >
          <h2 className="text-center text-2xl font-bold mb-6">Đăng nhập</h2>
          <button
            onClick={() => handleButtonClick("customer")}
            className={`bg-white border border-gray-300 text-gray-700 rounded-md py-2 px-4 w-full mb-4 hover:bg-gray-100 transition duration-300 ${
              activeForm === "customer" && "border-blue-500"
            }`}
          >
            Đăng nhập với quyền khách hàng
          </button>
          <button
            onClick={() => handleButtonClick("store")}
            className={`bg-white border border-gray-300 text-gray-700 rounded-md py-2 px-4 w-full mb-4 hover:bg-gray-100 transition duration-300 ${
              activeForm === "store" && "border-green-500"
            }`}
          >
            Đăng nhập với quyền chủ cửa hàng
          </button>
          <button
            onClick={() => handleButtonClick("admin")}
            className={`bg-white border border-gray-300 text-gray-700 rounded-md py-2 px-4 w-full hover:bg-gray-100 transition duration-300 ${
              activeForm === "admin" && "border-red-500"
            }`}
          >
            Đăng nhập với quyền admin
          </button>
        </div>
      </div>

      {/* Right Section - Login Forms */}
      <div className="w-2/3  p-8">
        {activeForm && (
          <>
            {/* Render the corresponding form based on activeForm */}
            {activeForm === "customer" && <CustomerLoginForm />}
            {activeForm === "store" && <ManagerLoginForm />}
            {activeForm === "admin" && <AdminLoginForm />}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
