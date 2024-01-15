// customerApi.js
import customerModel from "../model/customer.js";
import {
  handleNotFound,
  handleServerError,
  handleSuccess,
  handleBadRequest,
} from "../utils/handleResponse.js";
import { bikeModel } from "../model/bike.js";
import { orderModel } from "../model/order.js";
import { managerModel } from "../model/manager.js";
// get
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    return handleSuccess(res, "Lấy toàn bộ khách hàng thành công", customers);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const updateCustomerInfo = async (req, res) => {
  const { id } = req.params;
  const { name, phone, address, passWord } = req.body;
  try {
    const updatedCustomer = await customerModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name || undefined,
          phone: phone || undefined,
          address: address || undefined,
          passWord: passWord || undefined,
        },
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return handleNotFound(res, "Customer");
    }

    return handleSuccess(
      res,
      "Cập nhật thông tin khách hàng thành công",
      updatedCustomer
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// rent bike
export const rentBike = async (req, res) => {
  try {
    const { bike_id, price, startTime, endTime, customer_id } = req.body;

    // Check if the customer has already rented a bike
    const customer = await customerModel.findById(customer_id);
    const customer_name = customer.name;
    if (customer.did_rented) {
      return handleBadRequest(
        res,
        "Bạn đã đặt một xe khác rồi, không thể đặt thêm xe nữa"
      );
    }

    // Continue with the existing logic to check bike existence and create an order
    const bikeExists = await bikeModel.exists({ _id: bike_id });

    if (!bikeExists) {
      return handleNotFound(res, "Bike");
    }

    await bikeModel.findByIdAndUpdate(bike_id, { status: "pending" });

    const newOrder = new orderModel({
      bike_id: bike_id,
      price,
      startTime,
      endTime,
      customer_id: customer_id,
      orderTime: new Date(),
      customer_name: customer_name,
    });

    const savedOrder = await newOrder.save();

    // Update the did_rented field for the customer
    await customerModel.findByIdAndUpdate(customer_id, { did_rented: true });

    return handleSuccess(
      res,
      "Bạn đã đặt thuê xe thành công, hãy đến cửa hàng đúng giờ để nhận xe cũng như trả xe đúng giờ nhé",
      savedOrder
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// get your rented bike
export const getYourRentedBike = async (req, res) => {
  try {
    const { customer_id } = req.params;

    const rentedBike = await orderModel.find({ customer_id });

    return handleSuccess(res, "Thông tin xe bạn đã thuê", rentedBike);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// send ban bike request
export const sendBanBikeRequest = async (req, res) => {
  try {
    const { customer_id, bike_id } = req.params;

    const foundBike = await bikeModel.findById(bike_id);

    if (!foundBike) {
      return handleNotFound(res, "Bike");
    }

    if (foundBike.report_By.includes(customer_id)) {
      return handleBadRequest(
        res,
        "Bạn đã report xe này 1 lần rồi, đừng spam nữa nhé"
      );
    }

    foundBike.banRequestAmount += 1;
    foundBike.report_By.push(customer_id);

    const updatedBike = await foundBike.save();

    return handleSuccess(
      res,
      "Đã report xe này, hãy đợi quản trị viên kiểm tra tình hình nhé",
      updatedBike
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// get manager by province
export const getStoreByProvince = async (req, res) => {
  try {
    const { province } = req.params;

    const managers = await managerModel.find({ province });

    if (managers.length === 0) {
      return handleNotFound(res, "Không có cửa hàng nào thuộc quận này");
    }

    return handleSuccess(
      res,
      `Lấy thành công danh sách cửa hàng thuộc quận ${province}`,
      managers
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const getAllBike = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return handleNotFound(res, "trường id không được để trống");
    }

    const bikes = await bikeModel.find({
      owner_id: id,
      status: { $ne: "block" },
    }); // Correct the query
    if (bikes == null || bikes.length === 0) {
      return handleNotFound(res, "Không tìm được xe nào");
    }

    return handleSuccess(res, "Lấy dữ liệu xe thành công", bikes);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};
