import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    bike_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bike",
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
    status: {
      type: String,
      default: "pending",
    },
    orderTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

export default mongoose.model("Order", orderSchema);

export const orderModel = mongoose.model("order", orderSchema);
