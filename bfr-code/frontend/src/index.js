import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ManagerHomepage from "./pages/manager/homepage/ManagerHomepage.js";
import CustomerHomePage from "./pages/customer/homepage/homepage.js";
import CustomerProfile from "./pages/customer/profile/profile.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="manager">
        <Route path="homepage" element={<ManagerHomepage />} />
      </Route>
      <Route path="customer">
        <Route path="homepage" element={<CustomerHomePage />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
