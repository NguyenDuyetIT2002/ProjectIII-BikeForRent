import express from "express";
import {
  createManager,
  createManagerSR,
  createBike,
  getAllBike,
  updateBikeInformation,
  getAllOrdersByManagerId,
  acceptOrder,
  deleteBike,
} from "../controller/managerApi.js";

const managerRouter = express.Router();

managerRouter.post("/createManager", createManager); //admin route
managerRouter.post("/createmanagerSR", createManagerSR);
managerRouter.post("/createBike", createBike);
managerRouter.post("/getAllBike", getAllBike);
managerRouter.post("/updateBikeInformation", updateBikeInformation);
managerRouter.post("/getAllOrder", getAllOrdersByManagerId);
managerRouter.post("/acceptOrder", acceptOrder);
managerRouter.post("/deteleBike", deleteBike);
export default managerRouter;
