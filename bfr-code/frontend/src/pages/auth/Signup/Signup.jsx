import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomerSignupForm from "./CustomerSignupForm";
import ManagerSignupForm from "./ManagerSignupForm";

const Signup = () => {
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
    <div
      className="flex h-screen "
      style={{ background: "linear-gradient(to right, #f2e2e2, #f0f0f0)" }}
    >
      {/* Left Section - Buttons */}
      <div className="w-1/3 justify-center items-center flex shadow-sm">
        <div
          className="bg-white p-8 rounded shadow-md"
          style={{ maxWidth: "400px" }}
        >
          <h2 className="text-center text-2xl font-bold mb-6">Đăng ký</h2>
          <button
            onClick={() => handleButtonClick("customer")}
            className={`bg-white border border-gray-300 text-gray-700 rounded-md py-2 px-4 w-full mb-4 hover:bg-gray-100 transition duration-300 ${
              activeForm === "customer" && "border-blue-500"
            }`}
          >
            Đăng ký tài khoản khách hàng
          </button>
          <button
            onClick={() => handleButtonClick("store")}
            className={`bg-white border border-gray-300 text-gray-700 rounded-md py-2 px-4 w-full mb-4 hover:bg-gray-100 transition duration-300 ${
              activeForm === "store" && "border-green-500"
            }`}
          >
            Đăng ký tài khoản chủ cửa hàng
          </button>
        </div>
      </div>

      {/* Right Section - Login Forms */}
      <div className="w-2/3  p-8">
        {activeForm && (
          <>
            {activeForm === "customer" && <CustomerSignupForm />}
            {activeForm === "store" && <ManagerSignupForm />}
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
