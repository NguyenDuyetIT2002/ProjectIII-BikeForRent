import { bikeModel } from "../model/bike.js";
import { managerModel } from "../model/manager.js";

//create
export const createBike = async (req, res) => {
  try {
    const { name, type, price, owner_id, image, description } = req.body;

    // Kiểm tra xem owner_Id có tồn tại trong collection "manager" không
    const ownerExists = await managerModel.exists({ _id: owner_id });
    if (!ownerExists) {
      return res.status(400).json({ error: "Owner not found" });
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
    res.status(201).json(savingBike);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
