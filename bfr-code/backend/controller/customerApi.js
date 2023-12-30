import customerModel from "../model/customer.js";

// create
export const createCustomer = async (req, res) => {
  try {
    const { userName, passWord, address, phone, status, name } = req.body;

    // Helper function to check for duplicate values
    const checkDuplicate = async (field, value) => {
      const existingCustomer = await customerModel.findOne({ [field]: value });
      return existingCustomer !== null;
    };

    // Check for duplicate username
    if (await checkDuplicate("userName", userName)) {
      return res.status(400).json({
        code: 400,
        message: "Username already exists",
        data: null,
      });
    }

    // Check for duplicate phone number
    if (await checkDuplicate("phone", phone)) {
      return res.status(400).json({
        code: 400,
        message: "Phone number already exists",
        data: null,
      });
    }

    // If no duplicates, proceed with creating the user
    const newCustomer = new customerModel({
      userName,
      passWord,
      name,
      address,
      phone,
      status,
    });

    const savingCustomer = await newCustomer.save();

    res.status(201).json({
      code: 201,
      message: "Customer created successfully",
      data: savingCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
};

// get
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//ban user
export const banCustomer = async (req, res) => {
  const { customerId } = req.body;
  try {
    const customer = await customerModel.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: "Không tìm thấy khách hàng này" });
    }
    await customerModel.findByIdAndUpdate(customerId, { status: "ban" });
    res.status(200).json({ message: "Khóa tài khoản thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCustomerInfo = async (req, res) => {
  const { customerId, name, phone, address } = req.body;
  try {
    const updatedCustomer = await customerModel.findByIdAndUpdate(
      customerId,
      {
        $set: {
          name: name || undefined,
          phone: phone || undefined,
          address: address || undefined,
        },
      },
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ error: "Không tìm thấy khách hàng này" });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const customerLogin = async (req, res) => {
  try {
    const { userName, passWord } = req.body;

    const customer = await customerModel.findOne({ userName: userName });
    // console.log(customer);

    if (!customer) {
      return res.status(401).json({ error: "Tài khoản không tồn tại" });
    }

    if (customer.passWord !== passWord) {
      return res.status(401).json({ error: "Sai mật khẩu" });
    }

    res.status(200).json({ message: "Đăng nhập thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//rent bike
import { bikeModel } from "../model/bike.js";
import { orderModel } from "../model/order.js";

// Rent Bike
export const rentBike = async (req, res) => {
  try {
    const { bike_id, price, startTime, endTime, customer_id, orderTime } =
      req.body;

    // Kiểm tra xem bike có tồn tại không
    const bikeExists = await bikeModel.exists({ _id: bike_id });
    if (!bikeExists) {
      return res.status(404).json({
        code: 404,
        message: "Bike not found",
        data: null,
      });
    }

    // Tạo một đối tượng Order mới
    const newOrder = new orderModel({
      bike_id: bike_id,
      price,
      startTime,
      endTime,
      customer_id: customer_id,
      orderTime,
    });

    // Lưu đối tượng Order vào cơ sở dữ liệu
    const savedOrder = await newOrder.save();

    res.status(201).json({
      code: 201,
      message: "Create Order Successfully",
      data: savedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
};

// Send Ban Bike Request
export const sendBanBikeRequest = async (req, res) => {
  try {
    const { bikeId, customerId } = req.body;

    // Find the bike by _id
    const foundBike = await bikeModel.findById(bikeId);

    // Check if the bike exists
    if (!foundBike) {
      return res.status(404).json({
        code: 404,
        message: "Bike not found",
        data: null,
      });
    }

    // Check if the customer has already sent a ban request for this bike
    if (foundBike.report_By.includes(customerId)) {
      return res.status(400).json({
        code: 400,
        message: "You have already sent a ban request for this bike",
        data: null,
      });
    }

    // Update banRequestAmount and add customerId to report_By
    foundBike.banRequestAmount += 1;
    foundBike.report_By.push(customerId);

    // Save the updated bike
    const updatedBike = await foundBike.save();

    res.status(200).json({
      code: 200,
      message: "Ban request sent successfully",
      data: updatedBike,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
};
