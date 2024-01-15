import mongoose from "mongoose";

const ubRequestSchema = mongoose.Schema({
  bike_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bike",
  },
  time: Date,
  reason: String,
  image: String,
});

export const ubRequestModel = mongoose.model("ubrequest", ubRequestSchema);
