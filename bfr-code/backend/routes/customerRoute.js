import express from "express";
import {
  createCustomer,
  getAllCustomers,
  banCustomer,
  customerLogin,
  rentBike,
} from "../controller/customerApi.js";

const customerRouter = express.Router();

customerRouter.post("/createCustomer", createCustomer);
customerRouter.get("/getAllCustomers", getAllCustomers);
customerRouter.post("/banCustomer", banCustomer);
customerRouter.post("/login", customerLogin);
customerRouter.post("/rentBike", rentBike);

export default customerRouter;
