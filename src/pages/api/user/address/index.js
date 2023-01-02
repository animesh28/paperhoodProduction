import connectDB from "../../../../server_utils/connectDB";
import Users from "../../../../models/userModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await uploadInfor(req, res);
      break;
  }
};

const uploadInfor = async (req, res) => {
  try {
    const result = await auth(req, res);

    const {
      name,
      mobile,
      pincode,
      locality,
      address,
      city,
      state,
      landmark,
      altMobile,
    } = req.body;

    if (
      !name ||
      !mobile ||
      !pincode ||
      !locality ||
      !address ||
      !city ||
      !state
    )
      return res.status(400).json({ err: "Please add all the fields." });

    const newUser = await Users.findOneAndUpdate(
      { _id: result.id },
      {
        address: [
          ...result.address,
          {
            id: new Date().toString() + result.id,
            name,
            mobile,
            pincode,
            locality,
            address,
            city,
            state,
            landmark,
            altMobile,
          },
        ],
      }
    );

    res.json({
      msg: "Update Success!",
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
