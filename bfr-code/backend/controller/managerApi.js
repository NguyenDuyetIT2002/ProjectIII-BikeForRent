import { managerModel } from "../model/manager.js";
import customerModel from "../model/customer.js";
import { bikeModel } from "../model/bike.js";
import { orderModel } from "../model/order.js";
import { bcRequestModel } from "../model/bcRequest.js";
import {
  handleServerError,
  handleSuccess,
  handleNotFound,
} from "../utils/handleResponse.js";

// Create Bike
export const createBike = async (req, res) => {
  try {
    const { name, type, price, owner_id, image, description } = req.body;

    const ownerExists = await managerModel.exists({ _id: owner_id });
    if (!ownerExists) {
      return handleNotFound(res, "Owner not found");
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

    return handleSuccess(res, "Bike created successfully", savedBike);
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
      return handleNotFound(res, "Owner ID is required");
    }

    const bikes = await bikeModel.find({
      owner_id: id,
      status: { $ne: "block" },
    }); // Add status condition
    if (bikes == null || bikes.length === 0) {
      return handleNotFound(res, "No bikes found for the provided ID");
    }

    return handleSuccess(res, "Bikes retrieved successfully", bikes);
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
      return handleNotFound(res, "Bike not found");
    }

    const updatedBike = await bikeModel.findByIdAndUpdate(
      id,
      { name, type, price, image, description },
      { new: true }
    );

    return handleSuccess(res, "Bike updated successfully", updatedBike);
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
      return handleNotFound(res, "Bike not found");
    }

    await bikeModel.findByIdAndDelete(id);
    return handleSuccess(res, "Bike deleted successfully");
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

    return handleSuccess(res, "Orders retrieved successfully", orders);
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
      "Pending orders retrieved successfully",
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
      return handleNotFound(res, "Order not found");
    }

    order.status = "accepted";
    const updatedOrder = await order.save();

    await bikeModel.findByIdAndUpdate(order.bike_id, {
      rented_By: order.customer_id,
      status: "rented",
    });

    return handleSuccess(res, "Order accepted successfully", updatedOrder);
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

    // Extract bike IDs
    const bikeIds = bikes.map((bike) => bike._id);

    // Find pending orders for these bike IDs
    const pendingOrders = await orderModel.find({
      bike_id: { $in: bikeIds },
      status: "accepted",
    });

    return handleSuccess(
      res,
      "Accepted orders retrieved successfully",
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
      return handleNotFound(res, "Order not found");
    }

    await customerModel.findByIdAndUpdate(order.customer_id, {
      did_rented: false,
    });
    await bikeModel.findByIdAndUpdate(order.bike_id, {
      rented_By: null,
      status: "active",
    });
    await orderModel.findByIdAndDelete(id);

    return handleSuccess(res, "Order process completed successfully");
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// Get All Latest Incomplete Orders
export const getAllLatestIncompleteOrders = async (req, res) => {
  try {
    const { managerId } = req.params; // Assuming managerId is passed as a parameter

    const serverTime = new Date();
    const endTimeThreshold = new Date(
      serverTime.getTime() - 3 * 60 * 60 * 1000
    );

    const orders = await orderModel.find({
      endTime: { $lt: endTimeThreshold },
      status: "accepted",
      manager_id: managerId, // Add manager_id field to filter by manager ID
    });

    return handleSuccess(
      res,
      "Successfully retrieved latest incomplete orders",
      orders
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// Create Ban Customer Request
export const requestBanCustomer = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const bcRequest = await bcRequestModel.create({
      customer_id: customer_id,
      time: new Date(),
    });

    return handleSuccess(
      res,
      "Ban customer request created successfully",
      bcRequest
    );
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};
