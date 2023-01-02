const Razorpay = require("razorpay");
const shortid = require("shortid");
import priceList from "../../data/price.json";

const retreiveOptional = (item) => {
  for (let opt of priceList.optional) {
    if (opt.name === item) return Number(opt.price);
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const variant = req.body.variant;
    const dimension = req.body.dimension;
    const noOfPages = req.body.noOfPages;
    const noOfBooks = req.body.noOfBooks;
    const color = req.body.color;
    const weight = req.body.weight;

    let price = "";
    if (noOfPages < 30) price = "page_1_29";
    else if (noOfPages < 100) price = "page_30_99";
    else price = "page_100_500";

    let amount = 0;
    let variantObj;
    for (let vari of priceList.pages) {
      if (vari.name === variant) {
        variantObj = vari;
        break;
      }
    }
    for (let obj of variantObj.variants) {
      if (obj.weight === weight && obj.color === color) {
        variantObj = obj.types;
      }
    }
    let perPageCost = 0;
    for (let dim of variantObj) {
      if (dim.dimension === dimension) {
        perPageCost = dim.prices[price];
      }
    }

    amount += perPageCost * noOfPages;
    const hardCoverPrice = retreiveOptional("hardCover");
    const jacketPrice = retreiveOptional("jacket");
    amount += req.body.hardCover ? hardCoverPrice : 0;
    amount += req.body.jacket ? jacketPrice : 0;
    amount *= noOfBooks;

    const payment_capture = 1;
    const currency = "INR";
    const options = {
      amount: (parseInt(Math.ceil(amount)) * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}
