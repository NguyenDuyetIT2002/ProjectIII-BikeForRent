import express from "express";
import { createCustomer, getAllCustomers } from "./controller/customerApi.js";
import { handleConnectDB } from "./controller/dbController.js";
import { customerLogin } from "./controller/loginApi.js";
import { banCustomer } from "./controller/customerApi.js";
import { createManager } from "./controller/managerApi.js";
import { createBike } from "./controller/bikeApi.js";
import { createManagerSR } from "./controller/managerSRApi.js";

const app = express();
const port = 3000;
handleConnectDB();

// Cấu hình Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// customer endpoint
app.post("/api/customer/createCustomer", createCustomer);
app.get("/api/customer/getAllCustomers", getAllCustomers);
app.post("/api/customer/banCustomer", banCustomer);

//use login api endpoint
app.post("/api/login/customer", customerLogin);

//manager api endpoint
app.post("/api/manager/createManager", createManager);
app.post("/api/manager/createmanagerSR", createManagerSR);

//bike api endpoint
app.post("/api/bike/createBike", createBike);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
