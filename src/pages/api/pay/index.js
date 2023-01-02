import connectDB from "../../../server_utils/connectDB";
const url = require("url");

connectDB();

const Insta = require("instamojo-nodejs");

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await openInstamojo(req, res);
      break;

    case "GET":
      await redirectCallback(req, res);
      break;
  }
};

const openInstamojo = async (req, res) => {
  try {
    console.log(req.body.cart);

    Insta.setKeys(
      "207ca184d4837b87b6d6e96f1469be81",
      "62dc24858619ade42c77e898276192da"
    );

    let data = new Insta.PaymentData();
    Insta.isSandboxMode(false);

    // JSON.parse(req.body.cart).forEach(async (item) => {
    //   console.log(item);
    //   // const res = await getData(`product/${item.id}`);
    //   // price += res.price * item.quantity;
    // });
    console.log({ url: process.env.BASE_URL });
    data.purpose = "Paperhood Payment";
    data.amount = req.body.price;
    data.buyer_name = "Animesh Singh";
    data.redirect_url = `${process.env.BASE_URL}/api/pay/callback?user_id=63a49bfc215274d6b5d44e5a`;
    data.email = "animesh.raj.om@gmail.com";
    data.phone = "8210118679";
    data.send_email = false;
    data.webhook = `${process.env.LIVE_URL}/webhook/`;
    data.send_sms = false;
    data.allow_repeated_payments = false;

    Insta.createPayment(data, function (error, response) {
      if (error) {
        // some error
      } else {
        // Payment redirection link at response.payment_request.longurl
        const responseData = JSON.parse(response);
        if (!responseData.success) {
          return res.status(500).json({ err: "Payment Failed" });
        }

        const redirectURL = responseData.payment_request.longurl;
        console.log(redirectURL);

        res.status(200).json(redirectURL);
      }
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
