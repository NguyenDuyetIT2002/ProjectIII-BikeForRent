import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  passWord: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
    unique: true,
  },
  address: {
    type: String,
    require: true,
  },
  acc_role: {
    type: String,
    require: true,
  },
  acc_status: {
    type: String,
    require: true,
  },
  acc_identityNumber: {
    type: String,
    require: true,
    unique: true,
  },
});
