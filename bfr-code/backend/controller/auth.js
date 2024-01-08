import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import customerModel from "../model/customer.js";
import {
  handleSuccess,
  handleNotFound,
  handleServerError,
  handleDuplicateField,
} from "../utils/handleResponse.js";
import { checkDuplicateField } from "../utils/checkDuplicatedField.js";
import { managerSRModel } from "../model/managerSR.js";
import { managerModel } from "../model/manager.js";

dotenv.config();
const { JWT_SECRETKEY } = process.env;

export const customerSignup = async (req, res) => {
  try {
    const { userName, passWord, address, phone, name } = req.body;

    // Check for duplicate username or phone number
    const duplicateFields = await Promise.all([
      checkDuplicateField(customerModel, "userName", userName),
      checkDuplicateField(customerModel, "phone", phone),
    ]);

    if (duplicateFields.some((field) => field)) {
      return handleDuplicateField(res, duplicateFields);
    }

    // If no duplicates, proceed with creating the user
    const newCustomer = new customerModel({
      userName,
      passWord,
      name,
      address,
      phone,
    });

    const savingCustomer = await newCustomer.save();

    return handleSuccess(res, "Customer created successfully", savingCustomer);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

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

export const managerSignup = async (req, res) => {
  try {
    const {
      userName,
      passWord,
      province,
      address,
      phone,
      identify_code,
      license,
    } = req.body;

    const duplicateFields = await Promise.all([
      checkDuplicateField(managerSRModel, "userName", userName),
      checkDuplicateField(managerSRModel, "phone", phone),
      checkDuplicateField(managerSRModel, "license", license),
    ]);

    if (duplicateFields.some((field) => field)) {
      return handleDuplicateField(res, duplicateFields);
    }

    const newManagerSR = new managerSRModel({
      userName,
      passWord,
      province,
      address,
      phone,
      identify_code,
      license,
    });

    const savingManagerSR = await newManagerSR.save();

    return handleSuccess(
      res,
      "ManagerSR created successfully",
      savingManagerSR
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const managerLogin = async (req, res) => {
  try {
    const { userName, passWord } = req.body;
    const manager = await managerModel.findOne({ userName });
    if (!manager) {
      return handleNotFound(res, "Manager");
    }

    if (passWord != manager.passWord) {
      return handleNotFound(res, "Invalid credentials");
    }

    const token = jwt.sign({ userId: manager._id }, JWT_SECRETKEY, {
      expiresIn: "1h",
    });
    return handleSuccess(res, "Login succesfully", { token });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
