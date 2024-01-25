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
      return handleDuplicateField(
        res,
        "Thông tin bạn gửi có trùng với thông tin trong cơ sở dữ liệu"
      );
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

    return handleSuccess(
      res,
      "Tạo tài khoản khách hàng thành công, bạn sẽ được chuyển hướng đến trang đăng nhập sau 3s",
      savingCustomer
    );
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
      return handleNotFound(res, "Không tìm thấy tài khoản");
    }

    if (customer.status === "ban") {
      return handleBannedCustomer(
        res,
        "Tài khoản này đã bị khóa do bạn đã thực hiện hành vi vi phạm chính sách thuê xe, hãy đến cửa hàng trả xe ngay nếu không chúng tôi sẽ yêu cầu pháp luật xử lý"
      );
    }

    if (passWord != customer.passWord) {
      return handleNotFound(res, "Sai mật khẩu");
    }

    const token = jwt.sign({ userId: customer._id }, JWT_SECRETKEY, {
      expiresIn: "1h",
    });
    return handleSuccess(
      res,
      "Đăng nhập thành công, bạn sẽ được chuyển hướng sau 3s",
      { customer, token }
    );
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
      name,
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
      return handleDuplicateField(
        res,
        "Có trường dữ liệu bị trùng trong cơ sở dữ liệu"
      );
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
      name,
    });

    const savingManagerSR = await newManagerSR.save();

    return handleSuccess(
      res,
      "Gửi yêu cầu đăng ký chủ cửa hàng thành công, hãy đợi quản trị viên phê duyệt nhé",
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
      return handleNotFound(res, "Không tìm thấy tài khoản");
    }

    if (passWord != manager.passWord) {
      return handleNotFound(res, "Sai mật khẩu");
    }

    const token = jwt.sign({ userId: manager._id }, JWT_SECRETKEY, {
      expiresIn: "1h",
    });
    return handleSuccess(
      res,
      "Đăng nhập thành công, bạn sẽ được chuyển hướng sau 3s",
      { manager, token }
    );
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
      return handleNotFound(res, "Không tìm thấy tài khoản");
    }

    if (password !== admin.password) {
      return handleNotFound(res, "Sai mật khẩu");
    }

    const token = jwt.sign({ userId: admin._id }, JWT_SECRETKEY, {
      expiresIn: "1h",
    });

    return handleSuccess(
      res,
      "Đăng nhập thành công, bạn sẽ được chuyển hướng sau 3s",
      { token }
    );
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
