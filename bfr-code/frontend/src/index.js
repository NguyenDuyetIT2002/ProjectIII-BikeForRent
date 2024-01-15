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

import List from "./pages/admin/pages/list/List";
import Single from "./pages/admin/pages/single/Single";
import New from "./pages/admin/pages/new/New";
import { userInputs } from "./pages/admin/formSource.js";
import Homepage from "./pages/spalshpage/Homepage.jsx";

import HomePageAdmin from "./pages/admin/pages/home/Home.jsx";
import Login from "./pages/auth/Login/Login.jsx";

import Signup from "./pages/auth/Signup/Signup.jsx";

import ManagerHomepage from "./pages/manager/homepage/Homepage.js";
import ManagerAddbike from "./pages/manager/addbike/Addbike.js";
import ManagerEditbike from "./pages/manager/editbike/Editbike.js";

import ListBanningBike from "./pages/admin/pages/list/ListBanningBike.jsx";
import ListBanningUsers from "./pages/admin/pages/list/ListBanningUsers.jsx";
import ListOpenningBike from "./pages/admin/pages/list/ListOpenningBike.jsx";

import HomePageCustomer from "./pages/customer/pages/Homepage/home.jsx";
import CustomerProfile from "./pages/customer/pages/Profile/profile.jsx";
import ChooseLocation from "./pages/customer/pages/ChooseLocation/ChooseLocation.jsx";
import FeaturesCustomer from "./pages/customer/pages/Features/Features.jsx";

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
        <Route path="homepage" element={<HomePageAdmin />} />
        <Route path="acceptmanager">
          <Route index element={<List />} />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Accept Manager Account" />}
          />
        </Route>
        <Route path="banningbike">
          <Route index element={<ListBanningBike />} />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Banning Bike" />}
          />
        </Route>
        <Route path="banningusers">
          <Route index element={<ListBanningUsers />} />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Banning Users" />}
          />
        </Route>
        <Route path="openningbike">
          <Route index element={<ListOpenningBike />} />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Openning Bike" />}
          />
        </Route>
      </Route>

      <Route path="manager">
        <Route path="homepage" element={<ManagerHomepage />} />
        <Route path="addbike" element={<ManagerAddbike />} />
        <Route path="editbike" element={<ManagerEditbike />} />
      </Route>
      <Route path="customer">
        <Route path="homepage" element={<HomePageCustomer />} />
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="chooselocation" element={<ChooseLocation />} />
        <Route path="features" element={<FeaturesCustomer />} />
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
