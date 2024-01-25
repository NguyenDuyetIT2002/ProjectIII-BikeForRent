import mongoose from "mongoose";

const managerSchema = mongoose.Schema({
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
    type: String,
    required: true,
  },
});

export const managerModel = mongoose.model("manager", managerSchema);
