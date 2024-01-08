// customerApi.js
import customerModel from "../model/customer.js";
import {
  handleNotFound,
  handleServerError,
  handleSuccess,
  handleDuplicateField,
  handleBadRequest,
} from "../utils/handleResponse.js";
import { checkDuplicateField } from "../utils/checkDuplicatedField.js";
import { bikeModel } from "../model/bike.js";
import { orderModel } from "../model/order.js";

// get
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    return handleSuccess(res, "Get all customers successfully", customers);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

export const updateCustomerInfo = async (req, res) => {
  const { id } = req.params;
  const { name, phone, address } = req.body;
  try {
    const updatedCustomer = await customerModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name || undefined,
          phone: phone || undefined,
          address: address || undefined,
        },
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return handleNotFound(res, "Customer");
    }

    return handleSuccess(
      res,
      "Customer information updated successfully",
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
    const { bike_id, price, startTime, endTime, customer_id, orderTime } =
      req.body;

    // Check if the customer has already rented a bike
    const customer = await customerModel.findById(customer_id);
    if (customer.did_rented) {
      return handleBadRequest(
        res,
        "You have ordered another bike, please complete the order first"
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
      orderTime,
    });

    const savedOrder = await newOrder.save();

    // Update the did_rented field for the customer
    await customerModel.findByIdAndUpdate(customer_id, { did_rented: true });

    return handleSuccess(res, "Order created successfully", savedOrder);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

// send ban bike request
export const sendBanBikeRequest = async (req, res) => {
  try {
    const { bikeId, customerId } = req.body;

    const foundBike = await bikeModel.findById(bikeId);

    if (!foundBike) {
      return handleNotFound(res, "Bike");
    }

    if (foundBike.report_By.includes(customerId)) {
      return handleBadRequest(
        res,
        "You have already sent a ban request for this bike"
      );
    }

    foundBike.banRequestAmount += 1;
    foundBike.report_By.push(customerId);

    const updatedBike = await foundBike.save();

    return handleSuccess(res, "Ban request sent successfully", updatedBike);
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};
