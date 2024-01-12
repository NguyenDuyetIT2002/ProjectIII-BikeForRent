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
import List from "./pages/admin/pages/list/List";
import Single from "./pages/admin/pages/single/Single";
import New from "./pages/admin/pages/new/New";
import { userInputs } from "./pages/admin/formSource.js";
import HomePageAdmin from "./pages/admin/pages/home/Home.jsx"

import ManagerHomepage from "./pages/manager/homepage/Homepage.js";
import ManagerAddbike from "./pages/manager/addbike/Addbike.js";

import ListBanningBike from "./pages/admin/pages/list/ListBanningBike.jsx";
import ListBanningUsers from "./pages/admin/pages/list/ListBanningUsers.jsx";
import ListOpenningBike from "./pages/admin/pages/list/ListOpenningBike.jsx";

import CustomerHomePage from "./pages/customer/homepage/homepage.js";
import CustomerProfile from "./pages/customer/profile/profile.js";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

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
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
