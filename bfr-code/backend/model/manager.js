import mongoose from "mongoose";

const managerSchema = mongoose.Schema({
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

export const managerModel = mongoose.model("manager", managerSchema);
