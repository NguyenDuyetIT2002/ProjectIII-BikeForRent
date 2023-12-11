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

const Account = mongoose.model("Account", accountSchema);

export const getAllStoreAddress = async () => {
  try {
    // Lấy tất cả các tài khoản có acc_status là "storemanager"
    const storeManagers = await Account.find({ acc_role: "storemanager" });

    // Trích xuất danh sách địa chỉ từ kết quả
    const storeAddresses = storeManagers.map((manager) => manager.address);

    return storeAddresses;
  } catch (error) {
    console.error("Error in getAllStoreAddress method:", error.message);
    throw error;
  }
};

export default Account;
