import connectDB from "../../../server_utils/connectDB";
import Users from "../../../models/userModel";
import valid from "../../../server_utils/valid";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await registerSeller(req, res);
      break;
  }
};

const registerSeller = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      password,
      cf_password,
      role,
      role_descrip,
      accountHolderName,
      accountNo,
      bankBranchAddress,
      bankName,
      ifscCode,
      upi,
    } = req.body;

    const errMsg = valid(name, mobile, email, password, cf_password);
    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ err: "This email already exists." });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      name,
      email,
      mobile,
      password: passwordHash,
      cf_password,
      role: "admin",
      role_descrip,
      accountHolderName,
      accountNo,
      bankBranchAddress,
      bankName,
      ifscCode,
      upi,
    });

    await newUser.save();
    res.json({ msg: "Register Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
