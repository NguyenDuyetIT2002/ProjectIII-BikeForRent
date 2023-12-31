import express from "express";

import {
  customerLogin,
  customerSignup,
  managerLogin,
  managerSignup,
} from "../controller/auth.js";

const authRouter = express.Router();

authRouter.post("/customerLogin", customerLogin);
authRouter.post("/customerSignup", customerSignup);
authRouter.post("/managerSignup", managerSignup);
authRouter.post("/managerLogin", managerLogin);
export default authRouter;
