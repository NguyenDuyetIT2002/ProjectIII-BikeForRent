import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import customerModel from "../model/customer.js";
import {
  handleSuccess,
  handleNotFound,
  handleServerError,
  handleDuplicateField,
  handleBannedCustomer,
} from "../utils/handleResponse.js";
import { checkDuplicateField } from "../utils/checkDuplicatedField.js";
import { managerSRModel } from "../model/managerSR.js";
import { managerModel } from "../model/manager.js";
import { adminModel } from "../model/admin.js";
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
      return handleDuplicateField(res, "Duplicate fields found");
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

    if (customer.status === "ban") {
      return handleBannedCustomer(res, "Customer account is banned");
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
      gmail,
    } = req.body;

    const duplicateFields = await Promise.all([
      checkDuplicateField(managerSRModel, "phone", phone),
      checkDuplicateField(managerModel, "phone", phone),
      checkDuplicateField(managerSRModel, "license", license),
      checkDuplicateField(managerModel, "license", license),
      checkDuplicateField(managerSRModel, "gmail", gmail),
      checkDuplicateField(managerModel, "gmail", gmail),
      checkDuplicateField(managerSRModel, "identify_code", identify_code),
      checkDuplicateField(managerModel, "identify_code", identify_code),
    ]);

    if (duplicateFields.some((field) => field)) {
      return handleDuplicateField(res, "Duplicate fields found");
    }

    const newManagerSR = new managerSRModel({
      userName,
      passWord,
      province,
      address,
      phone,
      identify_code,
      license,
      gmail,
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

export const adminLogin = async (req, res) => {
  try {
    const { gmail, password } = req.body;
    const admin = await adminModel.findOne({ gmail });

    if (!admin) {
      return handleNotFound(res, "Admin");
    }

    if (password !== admin.password) {
      return handleNotFound(res, "Invalid credentials");
    }

    const token = jwt.sign({ userId: admin._id }, JWT_SECRETKEY, {
      expiresIn: "1h",
    });

    return handleSuccess(res, "Login successfully", { token });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
