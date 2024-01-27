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

import { store, persistor } from "./redux/index.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Homepage from "./pages/spalshpage/Homepage.jsx";

import Login from "./pages/auth/Login/Login.jsx";

import Signup from "./pages/auth/Signup/Signup.jsx";

import ManagerHomepage from "./pages/manager/homepage/Homepage.js";
import ManagerAddbike from "./pages/manager/addbike/Addbike.js";
import ManagerEditbike from "./pages/manager/editbike/Editbike.js";
import ManagerOrders from "./pages/manager/order/Orderspage.js";
import UnlockBike from "./pages/manager/unlockbike/UnlockBike.js";

import AcceptManager from "./pages/admin/acceptmanager/AcceptManager.js";
import BanningBike from "./pages/admin/banningbike/BanningBike.js";
import BanningUsers from "./pages/admin/banninguser/BanningUser.js";
import OpenningBike from "./pages/admin/openbike/OpenBike.js";

import CustomerProfile from "./pages/customer/pages/Profile/profile.jsx";
import ChooseLocation from "./pages/customer/pages/ChooseLocation/ChooseLocation.jsx";
import RentBike from "./pages/customer/pages/RentBike/RentBike.jsx";
import CustomerRentedBike from "./pages/customer/pages/RentedBike/RentedBike.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Homepage />} />
      <Route path="/auth/login">
        <Route index element={<Login />} />
      </Route>
      <Route path="/auth/signup">
        <Route index element={<Signup />} />
      </Route>
      <Route path="/admin">
        <Route path="acceptmanager">
          <Route index element={<AcceptManager />} />
        </Route>
        <Route path="banningbike">
          <Route index element={<BanningBike />} />
        </Route>
        <Route path="banningusers">
          <Route index element={<BanningUsers />} />
        </Route>
        <Route path="openningbike">
          <Route index element={<OpenningBike />} />
        </Route>
      </Route>

      <Route path="manager">
        <Route path="homepage" element={<ManagerHomepage />} />
        <Route path="addbike" element={<ManagerAddbike />} />
        <Route path="editbike" element={<ManagerEditbike />} />
        <Route path="orders" element={<ManagerOrders />} />
        <Route path="unlockbike" element={<UnlockBike />} />
      </Route>
      <Route path="customer">
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="chooselocation" element={<ChooseLocation />} />
        <Route path="rentbike" element={<RentBike />} />
        <Route path="rentedbike" element={<CustomerRentedBike />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
