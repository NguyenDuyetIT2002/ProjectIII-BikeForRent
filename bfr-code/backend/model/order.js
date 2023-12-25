import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  bike_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bike",
  },
  price: String,
  startTime: Date,
  endTime: Date,
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  status: {
    type: String,
    default: "pending",
  },
  orderTime: Date,
});

export const orderModel = mongoose.model("order", orderSchema);
