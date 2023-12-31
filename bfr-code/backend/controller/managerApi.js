import { managerModel } from "../model/manager.js";
import { managerSRModel } from "../model/managerSR.js";
import { bikeModel } from "../model/bike.js";
import { orderModel } from "../model/order.js";
import {
  handleDuplicateField,
  handleServerError,
  handleSuccess,
  handleNotFound,
} from "../utils/handleResponse.js";
import { checkDuplicateField } from "../utils/checkDuplicatedField.js";
// Create ManagerSR
export const createManagerSR = async (req, res) => {
  try {
    const { userName, passWord, address, phone, identify_code, license } =
      req.body;

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

// Create Bike
export const createBike = async (req, res) => {
  try {
    const { name, type, price, owner_id, image, description } = req.body;

    const ownerExists = await managerModel.exists({ _id: owner_id });
    if (!ownerExists) {
      return handleNotFound(res, "Owner");
    }

    const newBike = new bikeModel({
      name,
      type,
      price,
      owner_id,
      image,
      description,
    });

    const savingBike = await newBike.save();

    return handleSuccess(res, "Bike created successfully", savingBike);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const getAllBike = async (req, res) => {
  try {
    const { owner_id } = req.body;

    if (!owner_id) {
      return handleNotFound(res, "Owner ID is required");
    }

    const bikes = await bikeModel.find({ owner_id });

    return handleSuccess(res, "Get all bikes successfully", bikes);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// Update Bike Information
export const updateBikeInformation = async (req, res) => {
  try {
    const { id, name, type, price, image, description } = req.body;

    const bikeExists = await bikeModel.exists({ _id: id });
    if (!bikeExists) {
      return handleNotFound(res, "Bike");
    }

    const updatedFields = { name, type, price, image, description };
    const updatedBike = await bikeModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    return handleSuccess(
      res,
      "Bike information updated successfully",
      updatedBike
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const deleteBike = async (req, res) => {
  try {
    const { bikeId } = req.body;

    const foundBike = await bikeModel.findById(bikeId);

    if (!foundBike) {
      return handleNotFound(res, "Bike");
    }

    await bikeModel.findByIdAndDelete(bikeId);

    return handleSuccess(res, "Bike deleted successfully");
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const getAllOrdersByManagerId = async (req, res) => {
  try {
    const { managerId } = req.body;

    console.log("Manager ID:", managerId);

    const orders = await orderModel.find({
      "bike_id.owner_id": managerId,
    });

    console.log("Orders:", orders);

    return handleSuccess(res, "Get all orders successfully", orders);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const getAllPendingOrdersByManagerId = async (req, res) => {
  try {
    const { managerId } = req.body;

    console.log("Manager ID:", managerId);

    const pendingOrders = await orderModel.find({
      "bike_id.owner_id": managerId,
      status: "pending",
    });

    console.log("Pending Orders:", pendingOrders);

    return handleSuccess(
      res,
      "Get all pending orders successfully",
      pendingOrders
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const foundOrder = await orderModel.findById(orderId);

    if (!foundOrder) {
      return handleNotFound(res, "Order");
    }

    foundOrder.status = "success";
    const updatedOrder = await foundOrder.save();

    const bikeId = foundOrder.bike_id;
    const customer_id = foundOrder.customer_id;

    await bikeModel.findByIdAndUpdate(bikeId, {
      rented_By: customer_id,
      status: "rented",
    });

    return handleSuccess(res, "Order accepted successfully", updatedOrder);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// Complete Order Process
export const completeOrderProcess = async (req, res) => {
  try {
    const { order_id } = req.body;

    const foundOrder = await orderModel.findById(order_id);

    if (!foundOrder) {
      return handleNotFound(res, "Order");
    }

    const bike_id = foundOrder.bike_id;
    const updatedBike = await bikeModel.findByIdAndUpdate(
      bike_id,
      { rented_By: null, status: "active" },
      { new: true }
    );

    await orderModel.findByIdAndDelete(order_id);

    return handleSuccess(res, "Order process completed successfully");
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};
