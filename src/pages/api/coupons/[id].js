import connectDB from "../../../server_utils/connectDB";
import Coupon from "../../../models/couponModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await deleteCoupon(req, res);
      break;
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role === "user" || result.role === "print")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;

    await Coupon.findByIdAndDelete(id);
    res.json({ msg: "Deleted a coupon." });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
