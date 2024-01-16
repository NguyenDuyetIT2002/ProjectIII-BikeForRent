import express from "express";
import {
  createBike,
  getAllBike,
  updateBikeInformation,
  deleteBike,
  getAllOrdersByManagerId,
  getAllPendingOrdersByManagerId,
  acceptOrder,
  completeOrderProcess,
  getAllAcceptedOrdersByManagerId,
  getAllLatestIncompleteOrders,
  requestBanCustomer,
  getBlockedBikes,
  sendUBRequest,
} from "../controller/managerApi.js";

const managerRouter = express.Router();

// Create Bike
managerRouter.post("/createBike", createBike);

// Get All Bikes
managerRouter.get("/getBikes/:id", getAllBike);

// Update Bike Information
managerRouter.put("/updateBikeInfo/:id", updateBikeInformation);

// Delete Bike
managerRouter.delete("/deleteBike/:id", deleteBike);

// Get All Orders by Manager ID
managerRouter.get("/getOrdersBy/:manager_id", getAllOrdersByManagerId);

// Get All Pending Orders by Manager ID
managerRouter.get(
  "/getPendingOrdersBy/:manager_id",
  getAllPendingOrdersByManagerId
);

// Accept Order
managerRouter.post("/acceptOrder/:id", acceptOrder);

managerRouter.get(
  "/getAcceptedOrdersBy/:manager_id",
  getAllAcceptedOrdersByManagerId
);

// Complete Order Process
managerRouter.post("/completeOrder/:id", completeOrderProcess);

// Get All Lated Incomplete Orders by Manager ID
managerRouter.get(
  "/getAllLatestIncompleteOrdersBy/:manager_id",
  getAllLatestIncompleteOrders
);

managerRouter.post("/requestBanCustomer/:customer_id", requestBanCustomer);
managerRouter.get("/getBlockedBikes/:manager_id", getBlockedBikes);
managerRouter.post("/sendUBRequest", sendUBRequest);
export default managerRouter;
