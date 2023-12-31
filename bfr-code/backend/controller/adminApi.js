import { managerModel } from "../model/manager.js";
import { managerSRModel } from "../model/managerSR.js";
import customerModel from "../model/customer.js";
import {
  handleServerError,
  handleSuccess,
  handleNotFound,
} from "../utils/handleResponse.js";

export const createManager = async (req, res) => {
  try {
    const { request_id } = req.body;

    // Tìm managerSR bằng _id
    const managerSR = await managerSRModel.findById(request_id);

    // Kiểm tra xem managerSR có tồn tại không
    if (!managerSR) {
      return handleNotFound(res, "ManagerSR");
    }

    // Tạo một manager mới từ thông tin của managerSR
    const newManager = new managerModel({
      userName: managerSR.userName,
      passWord: managerSR.passWord,
      province: managerSR.province,
      address: managerSR.address,
      phone: managerSR.phone,
      identify_code: managerSR.identify_code,
      license: managerSR.license,
    });

    // Lưu manager mới
    const savingManager = await newManager.save();

    // Xóa managerSR đã được sử dụng để tạo manager mới
    await managerSRModel.findByIdAndDelete(request_id);

    return handleSuccess(res, "Manager created successfully", savingManager);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const banCustomer = async (req, res) => {
  const { customerId } = req.body;
  try {
    const customer = await customerModel.findById(customerId);

    if (!customer) {
      return handleNotFound(res, "Customer");
    }

    await customerModel.findByIdAndUpdate(customerId, { status: "ban" });

    return handleSuccess(res, "Customer account successfully banned");
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};
