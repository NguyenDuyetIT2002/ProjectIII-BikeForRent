import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
  userName: {
    unique: true,
    type: String,
  },
  passWord: String,
  address: String,
  phone: {
    unique: true,
    type: String,
  },
  status: String,
});

const customerModel = mongoose.model("customer", customerSchema);

export default customerModel;
