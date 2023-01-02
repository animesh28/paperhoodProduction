import mongoose from "mongoose";

const PriceListSchema = new mongoose.Schema({
  pages: {
    type: Array,
  },
  optional: {
    type: Array,
  },
});

let Dataset =
  mongoose.models.categories || mongoose.model("priceList", PriceListSchema);
export default Dataset;
