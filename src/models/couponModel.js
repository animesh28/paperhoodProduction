import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    dis_type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    max_limit: {
      type: Number,
      required: true,
    },
    min_amt: {
      type: Number,
      required: true,
    },
    free_ship: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.coupon || mongoose.model("coupon", couponSchema);
export default Dataset;
