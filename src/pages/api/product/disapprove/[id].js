import connectDB from "../../../../server_utils/connectDB";
import Products from "../../../../models/productModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await deliveredOrder(req, res);
      break;
  }
};

const deliveredOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role != "admin")
      return res.status(400).json({ err: "Authentication is not valid." });
    const { id } = req.query;

    await Products.findOneAndUpdate({ _id: id }, { approval: false });

    res.json({
      msg: "Updated success!",
      result: {
        approval: false,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
