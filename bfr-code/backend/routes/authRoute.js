import express from "express";

import {
  customerLogin,
  customerSignup,
  managerLogin,
  managerSignup,
  adminLogin,
} from "../controller/auth.js";

const authRouter = express.Router();

authRouter.post("/customerLogin", customerLogin);
authRouter.post("/customerSignup", customerSignup);
authRouter.post("/managerSignup", managerSignup);
authRouter.post("/managerLogin", managerLogin);
authRouter.post("/adminLogin", adminLogin);
export default authRouter;
