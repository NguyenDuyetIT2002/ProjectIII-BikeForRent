import { managerModel } from "../model/manager.js";
import { managerSRModel } from "../model/managerSR.js";
import customerModel from "../model/customer.js";
import { bikeModel } from "../model/bike.js";
import { bcRequestModel } from "../model/bcRequest.js";

import {
  handleServerError,
  handleSuccess,
  handleNotFound,
} from "../utils/handleResponse.js";

export const getAllManagerSR = async (req, res) => {
  try {
    const managerSRs = await managerSRModel.find();

    return handleSuccess(
      res,
      "Successfully retrieved all ManagerSRs",
      managerSRs
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const createManager = async (req, res) => {
  try {
    const { request_id } = req.params;

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
      gmail: managerSR.gmail,
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

export const getAllBCRequest = async (req, res) => {
  try {
    const bcRequests = await bcRequestModel.find();

    return handleSuccess(
      res,
      "Successfully retrieved all BC Requests",
      bcRequests
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const banCustomer = async (req, res) => {
  const { bcrequest_id } = req.params;
  try {
    const bcRequest = await bcRequestModel.findById(bcrequest_id);

    if (!bcRequest) {
      return handleNotFound(res, "BC Request");
    }

    const customer_id = bcRequest.customer_id;
    const customer = await customerModel.findById(customer_id);

    if (!customer) {
      return handleNotFound(res, "Customer");
    }

    await customerModel.findByIdAndUpdate(customer_id, { status: "ban" });

    await bcRequestModel.findByIdAndDelete(bcrequest_id);

    return handleSuccess(res, "Customer account successfully banned");
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const getReportedBikes = async (req, res) => {
  try {
    const reportedBikes = await bikeModel.find({
      banRequestAmount: { $gt: 0 },
    });

    return handleSuccess(
      res,
      "Successfully retrieved reported bikes",
      reportedBikes
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const blockBike = async (req, res) => {
  const { bike_id } = req.params;
  try {
    const bike = await bikeModel.findById(bike_id);

    if (!bike) {
      return handleNotFound(res, "Bike");
    }

    await bikeModel.findByIdAndUpdate(bike_id, { status: "block" });

    return handleSuccess(res, "Bike successfully blocked");
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};
