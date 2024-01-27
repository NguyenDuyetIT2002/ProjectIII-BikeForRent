import { managerModel } from "../model/manager.js";
import customerModel from "../model/customer.js";
import { bikeModel } from "../model/bike.js";
import { orderModel } from "../model/order.js";
import { bcRequestModel } from "../model/bcRequest.js";
import { ubRequestModel } from "../model/ubRequest.js";
import {
  handleServerError,
  handleSuccess,
  handleNotFound,
  handleBadRequest,
} from "../utils/handleResponse.js";

// Create Bike
export const createBike = async (req, res) => {
  try {
    const { name, type, price, owner_id, image, description } = req.body;

    const ownerExists = await managerModel.exists({ _id: owner_id });
    if (!ownerExists) {
      return handleNotFound(res, "Không tìm thấy chủ xe");
    }

    const newBike = new bikeModel({
      name,
      type,
      price,
      owner_id,
      image,
      description,
    });
    const savedBike = await newBike.save();

    return handleSuccess(res, "Thêm xe thành công!", savedBike);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// Get All Bikes
export const getAllBike = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return handleNotFound(res, "Trường id không được để trống");
    }

    const bikes = await bikeModel.find({
      owner_id: id,
    }); // Add status condition
    if (bikes == null || bikes.length === 0) {
      return handleNotFound(res, "Rất tiếc, bạn chưa có xe nào");
    }

    return handleSuccess(res, "Các xe hiện tại của bạn", bikes);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// Update Bike Information
export const updateBikeInformation = async (req, res) => {
  try {
    const { id } = req.params; // Make sure 'id' is correct without extra characters
    const { name, type, price, image, description } = req.body;

    const bikeExists = await bikeModel.exists({ _id: id });
    if (!bikeExists) {
      return handleNotFound(res, "Không tìm thấy xe");
    }

    const updatedBike = await bikeModel.findByIdAndUpdate(
      id,
      { name, type, price, image, description },
      { new: true }
    );

    return handleSuccess(res, "Cập nhật thông tin xe thành công", updatedBike);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// Delete Bike
export const deleteBike = async (req, res) => {
  try {
    const { id } = req.params;

    const bike = await bikeModel.findById(id);
    if (!bike) {
      return handleNotFound(res, "Không tìm thấy xe");
    }

    if (bike.status !== "active") {
      return handleBadRequest(res, "Xe này hiện tại không thể xóa");
    }

    await bikeModel.findByIdAndDelete(id);
    return handleSuccess(res, "Xóa xe thành công");
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// Get All Orders by Manager ID
export const getAllOrdersByManagerId = async (req, res) => {
  try {
    const { manager_id } = req.params;

    // Find all bikes owned by the manager
    const bikes = await bikeModel.find({ owner_id: manager_id });

    // Extract bike IDs
    const bikeIds = bikes.map((bike) => bike._id);

    // Find orders with these bike IDs
    const orders = await orderModel.find({ bike_id: { $in: bikeIds } });

    return handleSuccess(res, "Lấy đơn hàng thành công", orders);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// Get All Pending Orders by Manager ID
export const getAllPendingOrdersByManagerId = async (req, res) => {
  try {
    const { manager_id } = req.params;

    // Find all bike IDs owned by the manager
    const bikes = await bikeModel.find({ owner_id: manager_id });

    // Extract bike IDs
    const bikeIds = bikes.map((bike) => bike._id);

    // Find pending orders for these bike IDs
    const pendingOrders = await orderModel.find({
      bike_id: { $in: bikeIds },
      status: "pending",
    });

    return handleSuccess(
      res,
      "Lấy đơn hàng trong trạng thái chờ thành công",
      pendingOrders
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};
// Accept Order
export const acceptOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderModel.findById(id);
    if (!order) {
      return handleNotFound(res, "Không tìm thấy đơn hàng");
    }

    order.status = "accepted";
    const updatedOrder = await order.save();

    await bikeModel.findByIdAndUpdate(order.bike_id, {
      rented_By: order.customer_id,
      status: "rented",
    });

    return handleSuccess(
      res,
      "Đã chấp nhận đơn hàng, xin hãy giao xe cho khách của bạn",
      updatedOrder
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const getAllAcceptedOrdersByManagerId = async (req, res) => {
  try {
    const { manager_id } = req.params;

    // Find all bike IDs owned by the manager
    const bikes = await bikeModel.find({ owner_id: manager_id });

    const bikeIds = bikes.map((bike) => bike._id);

    // Find pending orders for these bike IDs
    const pendingOrders = await orderModel.find({
      bike_id: { $in: bikeIds },
      status: "accepted",
    });

    return handleSuccess(
      res,
      "Lấy đơn hàng trong trạng thái chấp nhận thành công",
      pendingOrders
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// Complete Order Process
export const completeOrderProcess = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderModel.findById(id);
    if (!order) {
      return handleNotFound(res, "Không tìm thấy đơn hàng");
    }

    await customerModel.findByIdAndUpdate(order.customer_id, {
      did_rented: false,
    });
    await bikeModel.findByIdAndUpdate(order.bike_id, {
      rented_By: null,
      status: "active",
    });
    await orderModel.findByIdAndDelete(id);

    return handleSuccess(
      res,
      "Hoàn tất đơn hàng thành công, hãy nhận lại xe từ khách của bạn"
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// Get All Latest Incomplete Orders
export const getAllLatestIncompleteOrders = async (req, res) => {
  try {
    const { manager_id } = req.params; // Assuming managerId is passed as a parameter

    const serverTime = new Date();
    const endTimeThreshold = new Date(
      serverTime.getTime() - 3 * 60 * 60 * 1000
    );

    const bikes = await bikeModel.find({ owner_id: manager_id });

    const bikeIds = bikes.map((bike) => bike._id);

    const orders = await orderModel.find({
      endTime: { $lt: endTimeThreshold },
      status: "accepted",
      bike_id: { $in: bikeIds },
    });

    return handleSuccess(res, "Lấy nhưng đơn hàng quá giờ thành công", orders);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// Create Ban Customer Request
export const requestBanCustomer = async (req, res) => {
  try {
    const { customer_id } = req.params;

    // Check if there's already a request with the same customer_id
    const existingRequest = await bcRequestModel.findOne({
      customer_id: customer_id,
    });

    if (existingRequest) {
      // If a request already exists, handle it as a bad request
      return handleBadRequest(
        res,
        "Bạn đã gửi yêu cầu khóa tài khoản người dùng này rồi."
      );
    }

    // If no existing request is found, proceed to create a new one
    const bcRequest = await bcRequestModel.create({
      customer_id: customer_id,
      time: new Date(),
    });

    return handleSuccess(
      res,
      "Đã gửi yêu cầu khóa tài khoản người dùng, hãy đợi quản trị viên xác nhận",
      bcRequest
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const getBlockedBikes = async (req, res) => {
  try {
    const { manager_id } = req.params;

    const bikes = await bikeModel.find({
      owner_id: manager_id,
      status: "block",
    });

    return handleSuccess(res, "Lấy danh sách xe bị khóa thành công", bikes);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const sendUBRequest = async (req, res) => {
  try {
    const { bike_id, reason, image } = req.body;

    // Check if there's already a request with the same bike_id
    const existingRequest = await ubRequestModel.findOne({ bike_id: bike_id });

    if (existingRequest) {
      // If a request already exists, handle it as a bad request
      return handleBadRequest(
        res,
        "Bạn đã gửi yêu cầu mở khóa xe này rồi. Hãy đợi quản trị viên phê duyệt nhé"
      );
    }

    // If no existing request is found, proceed to create a new one
    const ubrequest = await ubRequestModel.create({
      bike_id,
      reason,
      image,
      time: new Date(),
    });

    return handleSuccess(res, "Gửi yêu cầu mở khóa xe thành công", ubrequest);
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
