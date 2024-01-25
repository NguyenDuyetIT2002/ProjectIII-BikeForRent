import { managerModel } from "../model/manager.js";
import { managerSRModel } from "../model/managerSR.js";
import customerModel from "../model/customer.js";
import { bikeModel } from "../model/bike.js";
import { bcRequestModel } from "../model/bcRequest.js";
import { ubRequestModel } from "../model/ubRequest.js";

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
      return handleNotFound(res, "Không tìm thấy đơn đăng ký");
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
      name: managerSR.name,
    });

    // Lưu manager mới
    const savingManager = await newManager.save();

    // Xóa managerSR đã được sử dụng để tạo manager mới
    await managerSRModel.findByIdAndDelete(request_id);

    return handleSuccess(
      res,
      "Tạo tài khoản chủ cửa hàng thành công",
      savingManager
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const declineSR = async (req, res) => {
  try {
    const { request_id } = req.params;
    await managerSRModel.findByIdAndDelete(request_id);
    return handleSuccess(res, "Đã từ chối yêu cầu tạo tài khoản chủ cửa hàng");
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

export const getAllBCRequest = async (req, res) => {
  try {
    const bcRequests = await bcRequestModel.find();

    return handleSuccess(
      res,
      "Lấy dữ liệu đơn đăng ký chủ cửa hàng thành công",
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
      return handleNotFound(
        res,
        "Không tìm thấy yêu cầu khóa tài khoản khách hàng"
      );
    }

    const customer_id = bcRequest.customer_id;
    const customer = await customerModel.findById(customer_id);

    if (!customer) {
      return handleNotFound(res, "Không tìm thấy khách hàng");
    }

    await customerModel.findByIdAndUpdate(customer_id, { status: "ban" });

    await bcRequestModel.findByIdAndDelete(bcrequest_id);

    return handleSuccess(res, "Khóa tài khoản khách hàng thành công");
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
      "Lấy dữ liệu xe bị report thành công",
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

    return handleSuccess(res, "Đã khóa xe thành công");
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const getUBRequests = async (req, res) => {
  try {
    const ubRequests = await ubRequestModel.find();

    return handleSuccess(
      res,
      "Lấy dữ liệu yêu cầu mở khóa xe thành công",
      ubRequests
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const unlockBike = async (req, res) => {
  try {
    const { request_id, bike_id } = req.params;
    const bike = await bikeModel.findById(bike_id);

    if (!bike) {
      return handleNotFound(res, "Không tìm thấy xe");
    }
    const request = await ubRequestModel.findById(request_id);
    if (!request) {
      return handleNotFound(res, "Không tìm thấy yêu cầu mở khóa xe");
    }
    await ubRequestModel.findByIdAndDelete(request_id);

    await bikeModel.findByIdAndUpdate(bike_id, {
      status: "active",
      banRequestAmount: 0,
      report_By: [],
    });

    return handleSuccess(res, "Đã mở khóa xe thành công");
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};
