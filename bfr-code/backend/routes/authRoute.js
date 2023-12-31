import express from "express";

import { customerLogin } from "../controller/auth.js";

const authRouter = express.Router();

authRouter.post("/customerLogin", customerLogin);
export default authRouter;
