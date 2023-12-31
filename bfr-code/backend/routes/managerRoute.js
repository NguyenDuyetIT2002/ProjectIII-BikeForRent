import express from "express";
import {
  createManagerSR,
  createBike,
  getAllBike,
  updateBikeInformation,
  acceptOrder,
  deleteBike,
  getAllPendingOrdersByManagerId,
  getAllOrdersByManagerId,
  completeOrderProcess,
} from "../controller/managerApi.js";

const managerRouter = express.Router();

managerRouter.post("/createManagerSR", createManagerSR);
managerRouter.post("/createBike", createBike);
managerRouter.post("/getAllBike", getAllBike);
managerRouter.post("/updateBikeInformation", updateBikeInformation);
managerRouter.post("/getAllPendingOrder", getAllPendingOrdersByManagerId);
managerRouter.post("getAllOrder", getAllOrdersByManagerId);
managerRouter.post("/acceptOrder", acceptOrder);
managerRouter.post("/deteleBike", deleteBike);
managerRouter.post("/acceptOrder", acceptOrder);
managerRouter.post("/completeOrder", completeOrderProcess);
export default managerRouter;
