import connectDB from "../../../../server_utils/connectDB";
import Help from "../../../../models/helpModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await resolveTicket(req, res);
      break;
  }
};

const resolveTicket = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });
    const { id } = req.query;

    await Help.findOneAndUpdate({ _id: id }, { status: true });

    res.json({
      msg: "Updated success!",
      result: {
        status: true,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
