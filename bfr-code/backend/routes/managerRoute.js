import express from "express";
import {
  createManager,
  createManagerSR,
  createBike,
  getAllBike,
  updateBikeInformation,
  getAllOrdersByManagerId,
  acceptOrder,
} from "../controller/managerApi.js";

const managerRouter = express.Router();

managerRouter.post("/createManager", createManager);
managerRouter.post("/createmanagerSR", createManagerSR);
managerRouter.post("/createBike", createBike);
managerRouter.post("/getAllBike", getAllBike);
managerRouter.post("/updateBikeInformation", updateBikeInformation);
managerRouter.post("/getAllOrder", getAllOrdersByManagerId);
managerRouter.post("/acceptOrder", acceptOrder);
export default managerRouter;
