import connectDB from "../../server_utils/connectDB";
import PriceList from "../../models/priceListModel";
import auth from "../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getPriceList(req, res);
      break;
  }
};

const getPriceList = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });

    const price = await PriceList.find();

    res.json({ price });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
