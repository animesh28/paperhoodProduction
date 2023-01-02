import connectDB from "../../../server_utils/connectDB";
import Help from "../../../models/helpModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createTicket(req, res);
      break;
    case "GET":
      await getTickets(req, res);
      break;
  }
};

const getTickets = async (req, res) => {
  try {
    const result = await auth(req, res);

    let tickets;
    if (result.role === "user") {
      return res.status(500).json({ err: "Auth failed" });
    } else {
      tickets = await Help.find().populate("user", "-password");
    }
    res.json({ tickets });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createTicket = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { issue, email, description } = req.body;

    const newTicket = new Help({
      user: result.id,
      issue,
      email,
      description,
      status: false,
    });

    await newTicket.save();

    res.json({
      msg: "Ticket raised! We will resolve your issue soon.",
      newTicket,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
