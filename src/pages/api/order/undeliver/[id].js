import connectDB from "../../../../server_utils/connectDB";
import Orders from "../../../../models/orderModel";
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
    if (result.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });
    const { id } = req.query;

    const order = await Orders.findOne({ _id: id });
    if (order.paid && order.method != "Receive Cash") {
      await Orders.findOneAndUpdate({ _id: id }, { delivered: false });

      res.json({
        msg: "Updated success!",
        result: {
          paid: true,
          dateOfPayment: order.dateOfPayment,
          method: order.method,
          delivered: false,
        },
      });
    } else {
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: false,
          dateOfPayment: new Date().toISOString(),
          method: "Receive Cash",
          delivered: true,
        }
      );

      res.json({
        msg: "Updated success!",
        result: {
          paid: false,
          dateOfPayment: new Date().toISOString(),
          method: "Receive Cash",
          delivered: true,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
