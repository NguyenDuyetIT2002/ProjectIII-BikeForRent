import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  bike_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bike",
    required: true,
  },
  bike_name: {
    type: String,
    required: true,
  },
  price: Number, // Changed to Number for numerical operations
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true,
  },
  customer_name: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  orderTime: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);

export const orderModel = mongoose.model("order", orderSchema);
