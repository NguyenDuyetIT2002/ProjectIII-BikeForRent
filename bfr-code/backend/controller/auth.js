import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import customerModel from "../model/customer.js";
import {
  handleSuccess,
  handleNotFound,
  handleServerError,
} from "../utils/handleResponse.js";

dotenv.config();
const { JWT_SECRETKEY } = process.env;

export const customerLogin = async (req, res) => {
  try {
    const { userName, passWord } = req.body;
    const customer = await customerModel.findOne({ userName });
    if (!customer) {
      return handleNotFound(res, "Customer");
    }

    if (passWord != customer.passWord) {
      return handleNotFound(res, "Invalid credentials");
    }

    const token = jwt.sign({ userId: customer._id }, JWT_SECRETKEY, {
      expiresIn: "1h",
    });
    return handleSuccess(res, "Login succesfully", { token });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
