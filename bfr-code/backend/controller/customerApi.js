import customerModel from "../model/customer.js";

// create
export const createCustomer = async (req, res) => {
  try {
    const { userName, passWord, address, phone, status } = req.body;
    const newCustomer = new customerModel({
      userName,
      passWord,
      address,
      phone,
      status,
    });

    const savingCustomer = await newCustomer.save();
    res.status(201).json(savingCustomer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
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
