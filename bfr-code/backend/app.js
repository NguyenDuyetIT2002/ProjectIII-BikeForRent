import express from "express";
import { createCustomer, getAllCustomers } from "./controller/customerApi.js";
import { handleConnectDB } from "./controller/dbController.js";
import { customerLogin } from "./controller/loginApi.js";

const app = express();
const port = 3000;
handleConnectDB();

// Cấu hình Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//use customer api
app.post("/api/customers/createCustomer", createCustomer);
app.get("/api/customers/getAllCustomers", getAllCustomers);

//use login api
app.post("/api/login/customer", customerLogin);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
