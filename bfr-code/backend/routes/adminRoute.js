// adminRoute.js

import express from "express";
import { createManager } from "../controller/adminApi.js";

const adminRouter = express.Router();

adminRouter.post("/createManager", createManager);

export default adminRouter;
