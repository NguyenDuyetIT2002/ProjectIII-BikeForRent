import express from "express";
import {
  getAllCustomers,
  rentBike,
  updateCustomerInfo,
  sendBanBikeRequest,
} from "../controller/customerApi.js";

const customerRouter = express.Router();

customerRouter.get("/getAllCustomers", getAllCustomers);
customerRouter.post("/rentBike", rentBike);
customerRouter.post("/updateInfo", updateCustomerInfo);
customerRouter.post("/requestBanBike", sendBanBikeRequest);
export default customerRouter;
