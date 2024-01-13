import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  gmail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const adminModel = mongoose.model("admin", adminSchema);
