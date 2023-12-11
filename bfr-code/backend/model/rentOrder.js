import mongoose from "mongoose";
import { Bike } from "./bikeSchema";
import Account from "./accountSchema";

const OrderSchema = mongoose.Schema({
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bike",
    require: true,
  },
  bikeOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    require: true,
  },
  bikePrice: {
    type: String,
    require: true,
  },
  startTime: {
    type: Date,
    require: true,
  },
  endTime: {
    type: Date,
    require: true,
  },
  customer_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    require: true,
  },
  order_status: {
    type: String,
    require: true,
  },
  order_time: {
    type: Date,
    require: true,
  },
});

OrderSchema.pre("save", async function (next) {
  try {
    const populatedOrder = await this.populate("bikeId").execPopulate();
    this.bikePrice = populatedOrder.bikeId.price;
    next();
  } catch (error) {
    console.error("Error in presave: ", error.message);
    next(error);
  }
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;

export const getAllOrder = async () => {
  try {
    const AllOrders = await Order.find({
      order_status: pending,
    });
    return AllOrders;
  } catch (error) {
    console.error("Fail in method", error.message);
  }
  throw error;
};

export const getAllSuccessOrder = async () => {
  try {
    const AllOrders = await Order.find({
      order_status: success,
    });
    return AllOrders;
  } catch (error) {
    console.error("Fail in method", error.message);
  }
  throw error;
};
