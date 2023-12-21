import { managerSRModel } from "../model/managerSR.js";

//create
export const createManagerSR = async (req, res) => {
  try {
    const { userName, passWord, address, phone, identify_code, license } =
      req.body;
    const newManagerSR = new managerSRModel({
      userName,
      passWord,
      address,
      phone,
      identify_code,
      license,
    });

    const savingManagerSR = await newManagerSR.save();
    res.status(201).json(savingManagerSR);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Serval Error" });
  }
};
