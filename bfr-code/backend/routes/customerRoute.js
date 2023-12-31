import express from "express";
import {
  createCustomer,
  getAllCustomers,
  banCustomer,
  rentBike,
  updateCustomerInfo,
  sendBanBikeRequest,
} from "../controller/customerApi.js";

const customerRouter = express.Router();

customerRouter.post("/createCustomer", createCustomer);
customerRouter.get("/getAllCustomers", getAllCustomers);
customerRouter.post("/banCustomer", banCustomer); // admin route - change later
customerRouter.post("/rentBike", rentBike);
customerRouter.post("/updateInfo", updateCustomerInfo);
customerRouter.post("requestBanBike", sendBanBikeRequest);
export default customerRouter;
