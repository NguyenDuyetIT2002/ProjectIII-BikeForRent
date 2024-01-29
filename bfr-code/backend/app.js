import express from "express";
import cors from "cors";
import { handleConnectDB } from "./config/mongoConfig.js";
import customerRouter from "./routes/customerRoute.js";
import managerRouter from "./routes/managerRoute.js";
import adminRouter from "./routes/adminRoute.js";
import authRouter from "./routes/authRoute.js";
import { verifyToken } from "./middleware/authMiddleware.js";

const app = express();
const port = 8080;
handleConnectDB();

// Cấu hình Body Parser Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use customer routes
app.use("/customer", verifyToken, customerRouter);

// Use manager routes
app.use("/manager", verifyToken, managerRouter);

app.use("/admin", verifyToken, adminRouter);

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
