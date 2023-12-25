import mongoose from "mongoose";

const bcRequestSchema = mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  time: Date,
});

export const bcRequestModel = mongoose.model("bcrequest", bcRequestModel);
