// adminRoute.js

import express from "express";
import {
  banCustomer,
  createManager,
  declineSR,
  getAllManagerSR,
  getReportedBikes,
  blockBike,
  getAllBCRequest,
  getUBRequests,
  unlockBike,
} from "../controller/adminApi.js";

const adminRouter = express.Router();

adminRouter.get("/getAllManagerSR", getAllManagerSR);
adminRouter.post("/createManager/:request_id", createManager);
adminRouter.post("/declineSR/:request_id", declineSR);
adminRouter.get("/getAllBCRequest", getAllBCRequest);
adminRouter.post("/banCustomer/:bcrequest_id", banCustomer);
adminRouter.get("/getReportedBikes", getReportedBikes);
adminRouter.post("/blockBike/:bike_id", blockBike);
adminRouter.get("/getUBRequests", getUBRequests);
adminRouter.post("/unlockBike/:request_id/:bike_id", unlockBike);
export default adminRouter;
