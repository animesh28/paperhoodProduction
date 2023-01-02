import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    root: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
    },
    role_descrip: {
      type: String,
      default: "user",
    },
    accountHolderName: {
      type: String,
    },
    bankName: {
      type: String,
    },
    ifscCode: {
      type: String,
    },
    accountNo: {
      type: String,
    },
    bankBranchAddress: {
      type: String,
    },
    upi: {
      type: String,
    },
    address: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;
