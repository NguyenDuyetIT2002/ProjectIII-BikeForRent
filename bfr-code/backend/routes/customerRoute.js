import express from "express";
import {
  getAllCustomers,
  rentBike,
  updateCustomerInfo,
  sendBanBikeRequest,
  getYourRentedBike,
  getAllBike,
  getStoreByProvince,
} from "../controller/customerApi.js";

const customerRouter = express.Router();

customerRouter.get("/getAllCustomers", getAllCustomers);
customerRouter.post("/rentBike", rentBike);
customerRouter.put("/updateInfo/:id", updateCustomerInfo);
customerRouter.get("/getYourRentedBike/:customer_id", getYourRentedBike);
customerRouter.post(
  "/requestBanBike/:customer_id/:bike_id",
  sendBanBikeRequest
);
customerRouter.get("/getStoreByProvince/:province", getStoreByProvince);
customerRouter.get("/getBikes/:id", getAllBike);
export default customerRouter;
