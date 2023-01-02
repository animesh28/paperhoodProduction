import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
    },
    page: {
      type: String,
    },
    dimension: {
      type: String,
    },
    color: {
      type: String,
    },
    weight: {
      type: String,
    },
    isbn: {
      type: String,
      unique: true,
    },
    binding: {
      type: String,
    },
    language: {
      type: String,
    },
    disPrice: {
      type: Number,
    },
    reviews: {
      type: Array,
      required: true,
    },
    approval: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.product || mongoose.model("product", productSchema);
export default Dataset;
