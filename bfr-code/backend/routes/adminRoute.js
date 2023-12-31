// adminRoute.js

import express from "express";
import { banCustomer, createManager } from "../controller/adminApi.js";

const adminRouter = express.Router();

adminRouter.post("/createManager", createManager);
adminRouter.post("/banCustomer", banCustomer);
export default adminRouter;
