// app.js (or server.js)
import express from "express";
import { handleConnectDB } from "./controller/dbController.js";
import customerRouter from "./routes/customerRoute.js";
import managerRouter from "./routes/managerRoute.js";

const app = express();
const port = 3000;
handleConnectDB();

// Cấu hình Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use customer routes
app.use("/customer", customerRouter);

// Use manager routes
app.use("/manager", managerRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
