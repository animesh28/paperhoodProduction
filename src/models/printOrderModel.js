import mongoose from "mongoose";

const printOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    pages: {
      type: Number,
    },
    pageType: {
      type: String,
    },
    binding: {
      type: String,
    },
    pageColor: {
      type: String,
    },
    pageWeight: {
      type: String,
    },
    pageDimensions: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.order || mongoose.model("printOrder", printOrderSchema);
export default Dataset;
