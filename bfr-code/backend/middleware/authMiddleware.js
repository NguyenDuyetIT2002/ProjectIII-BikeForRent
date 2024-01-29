import customerModel from "../model/customer.js";
import { managerModel } from "../model/manager.js";
import { adminModel } from "../model/admin.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    // Tìm kiếm người dùng trong các model
    const customer = await customerModel.findById(decoded.userId);
    const manager = await managerModel.findById(decoded.userId);
    const admin = await adminModel.findById(decoded.userId);

    if (!customer && !manager && !admin) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    // Kiểm tra vai trò
    const role = customer ? "customer" : manager ? "manager" : "admin";
    req.user = {
      id: decoded.userId,
      role,
    };

    // Kiểm tra và chỉ cho phép nếu đúng vai trò
    if (req.baseUrl.includes(role)) {
      next();
    } else {
      return res.status(401).json({ message: "Invalid Token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
