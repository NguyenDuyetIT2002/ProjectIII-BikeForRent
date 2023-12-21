import { managerModel } from "../model/manager.js";
import { managerSRModel } from "../model/managerSR.js";
//create
export const createManager = async (req, res) => {
  try {
    const { userName, passWord, address, phone, identify_code, license, _id } =
      req.body;
    const newManager = new managerModel({
      userName,
      passWord,
      address,
      phone,
      identify_code,
      license,
    });

    const savingManager = await newManager.save();
    const deleteManagerSR = await managerSRModel.findByIdAndDelete(_id);
    res.status(201).json(savingManager);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Serval Error" });
  }
};
