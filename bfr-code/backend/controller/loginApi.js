import customerModel from "../model/customer.js";

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
