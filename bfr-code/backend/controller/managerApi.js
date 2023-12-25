import { managerModel } from "../model/manager.js";
import { managerSRModel } from "../model/managerSR.js";
import { bikeModel } from "../model/bike.js";
import { orderModel } from "../model/order.js";

const checkDuplicateField = async (model, field, value) => {
  const existingDocument = await model.findOne({ [field]: value });
  return existingDocument !== null;
};

// Create Manager
export const createManager = async (req, res) => {
  try {
    const { userName, passWord, address, phone, identify_code, license, _id } =
      req.body;

    // Check for duplicate userName, phone, and license
    const isDuplicateUserName = await checkDuplicateField(
      managerModel,
      "userName",
      userName
    );
    const isDuplicatePhone = await checkDuplicateField(
      managerModel,
      "phone",
      phone
    );
    const isDuplicateLicense = await checkDuplicateField(
      managerModel,
      "license",
      license
    );

    if (isDuplicateUserName || isDuplicatePhone || isDuplicateLicense) {
      return res.status(400).json({
        code: 400,
        message: "Duplicate field found",
        data: null,
      });
    }

    const newManager = new managerModel({
      userName,
      passWord,
      address,
      phone,
      identify_code,
      license,
    });

    const savingManager = await newManager.save();

    // Delete corresponding managerSR
    const deleteManagerSR = await managerSRModel.findByIdAndDelete(_id);

    res.status(201).json({
      code: 201,
      message: "Manager created successfully",
      data: savingManager,
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

// Create Bike
export const createBike = async (req, res) => {
  try {
    const { name, type, price, owner_id, image, description } = req.body;

    // Check if owner_id exists in the "manager" collection
    const ownerExists = await managerModel.exists({ _id: owner_id });
    if (!ownerExists) {
      return res.status(400).json({
        code: 400,
        message: "Owner not found",
        data: null,
      });
    }

    const newBike = new bikeModel({
      name,
      type,
      price,
      owner_id,
      image,
      description,
    });

    const savingBike = await newBike.save();

    res.status(201).json({
      code: 201,
      message: "Bike created successfully",
      data: savingBike,
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

// Create ManagerSR
export const createManagerSR = async (req, res) => {
  try {
    const { userName, passWord, address, phone, identify_code, license } =
      req.body;

    // Check for duplicate userName, phone, and license
    const isDuplicateUserName = await checkDuplicateField(
      managerSRModel,
      "userName",
      userName
    );
    const isDuplicatePhone = await checkDuplicateField(
      managerSRModel,
      "phone",
      phone
    );
    const isDuplicateLicense = await checkDuplicateField(
      managerSRModel,
      "license",
      license
    );

    if (isDuplicateUserName || isDuplicatePhone || isDuplicateLicense) {
      return res.status(400).json({
        code: 400,
        message: "Duplicate field found",
        data: null,
      });
    }

    const newManagerSR = new managerSRModel({
      userName,
      passWord,
      address,
      phone,
      identify_code,
      license,
    });

    const savingManagerSR = await newManagerSR.save();

    res.status(201).json({
      code: 201,
      message: "ManagerSR created successfully",
      data: savingManagerSR,
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

export const getAllBike = async (req, res) => {
  try {
    const { owner_id } = req.body;

    // Kiểm tra xem owner_id có được truyền vào không
    if (!owner_id) {
      return res.status(400).json({
        code: 400,
        message: "Owner ID is required",
        data: null,
      });
    }

    // Tìm tất cả các xe với owner_id tương ứng
    const bikes = await bikeModel.find({ owner_id });

    res.status(200).json({
      code: 200,
      message: "Get all bikes successfully",
      data: bikes,
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

// Update Bike Information
export const updateBikeInformation = async (req, res) => {
  try {
    const { id, name, type, price, image, description } = req.body;

    // Kiểm tra xem bike có tồn tại không
    const bikeExists = await bikeModel.exists({ _id: id });
    if (!bikeExists) {
      return res.status(404).json({
        code: 404,
        message: "Bike not found",
        data: null,
      });
    }

    // Tạo một đối tượng mới chỉ chứa các trường cần cập nhật
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (type) updatedFields.type = type;
    if (price) updatedFields.price = price;
    if (image) updatedFields.image = image;
    if (description) updatedFields.description = description;

    // Cập nhật thông tin của bike
    const updatedBike = await bikeModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({
      code: 200,
      message: "Bike information updated successfully",
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

export const getAllOrdersByManagerId = async (req, res) => {
  try {
    const { managerId } = req.body;

    console.log("Manager ID:", managerId);

    const orders = await orderModel.find({
      "bike_id.owner_id": managerId,
    });

    console.log("Orders:", orders);

    res.status(200).json({
      code: 200,
      message: "Get all orders successfully",
      data: orders,
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

export const acceptOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Find the order by _id
    const foundOrder = await orderModel.findById(orderId);

    // Check if the order exists
    if (!foundOrder) {
      return res.status(404).json({
        code: 404,
        message: "Order not found",
        data: null,
      });
    }

    // Check if the order is in "pending" status
    if (foundOrder.status !== "pending") {
      return res.status(400).json({
        code: 400,
        message: "Order is not in pending status",
        data: null,
      });
    }

    // Update the status of the order to "success"
    foundOrder.status = "success";
    const updatedOrder = await foundOrder.save();

    // Update rentedBy of the corresponding bike
    const bikeId = foundOrder.bike_id;
    const customer_id = foundOrder.customer_id;

    // Update the bike model with the rentedBy information
    await bikeModel.findByIdAndUpdate(bikeId, { rented_By: customer_id });

    res.status(200).json({
      code: 200,
      message: "Order accepted successfully",
      data: updatedOrder,
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
