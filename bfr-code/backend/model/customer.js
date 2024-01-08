import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
  userName: {
    unique: true,
    type: String,
  },
  passWord: String,
  name: String,
  address: String,
  phone: {
    unique: true,
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
  did_rented: {
    type: Boolean,
    default: false,
  },
});

const customerModel = mongoose.model("customer", customerSchema);

export default customerModel;
