import connectDB from "../../../server_utils/connectDB";
import Coupon from "../../../models/couponModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createCoupon(req, res);
      break;
    case "GET":
      await getCoupons(req, res);
      break;
  }
};

const createCoupon = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { dis_type, amount, code, expiry, max_limit, min_amt, free_ship } =
      req.body;

    const coupon = await Coupon.findOne({ code });
    if (coupon)
      return res.status(400).json({ err: "This coupon code already exists." });
    if (!dis_type || !amount || !code || !expiry || !max_limit || !min_amt)
      return res.status(400).json({ err: "Fill all fields." });

    const newCoupon = new Coupon({
      dis_type,
      amount,
      code,
      expiry,
      max_limit,
      min_amt,
      free_ship,
    });

    await newCoupon.save();
    res.json({
      msg: "Success! Created a new coupon.",
      newCoupon,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();

    res.json({ coupons });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
