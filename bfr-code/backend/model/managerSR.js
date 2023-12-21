import mongoose from "mongoose";

const managerSRSchema = mongoose.Schema({
  userName: {
    unique: true,
    type: String,
  },
  passWord: String,
  address: String,
  phone: String,
  license: String,
  identify_code: String,
});

export const managerSRModel = mongoose.model("managerSR", managerSRSchema);
