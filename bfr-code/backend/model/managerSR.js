import mongoose from "mongoose";

const managerSRSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  province: String,
  address: String,
  phone: {
    unique: true,
    type: String,
    required: true,
  },
  license: {
    unique: true,
    type: String,
    required: true,
  },
  identify_code: {
    unique: true,
    type: String,
    required: true,
  },
  gmail: {
    unique: true,
    type: String,
    required: true,
  },
});

export const managerSRModel = mongoose.model("managerSR", managerSRSchema);
