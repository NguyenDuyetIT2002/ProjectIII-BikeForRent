// adminRoute.js

import express from "express";
import {
  banCustomer,
  createManager,
  getAllManagerSR,
  getReportedBikes,
  blockBike,
  getAllBCRequest,
} from "../controller/adminApi.js";

const adminRouter = express.Router();

adminRouter.get("/getAllManagerSR", getAllManagerSR);
adminRouter.post("/createManager/:request_id", createManager);
adminRouter.get("/getAllBCRequest", getAllBCRequest);
adminRouter.post("/banCustomer/:bcrequest_id", banCustomer);
adminRouter.get("/getReportedBikes", getReportedBikes);
adminRouter.post("/blockBike/:bike_id", blockBike);
export default adminRouter;
