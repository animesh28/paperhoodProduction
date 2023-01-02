import connectDB from "../../../server_utils/connectDB";
const url = require("url");

connectDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await redirectCallback(req, res);
      break;
  }
};
const redirectCallback = async (req, res) => {
  /**
   * @route GET api/bid/callback/
   * @desc Call back url for instamojo
   * @access public
   */
  let url_parts = url.parse(req.url, true),
    responseData = url_parts.query;

  if (responseData.payment_id) {
    let userId = responseData.user_id;

    // Save the order that user has purchased the products

    // Redirect the user to payment complete page.
    return res.redirect(
      `${process.env.BASE_URL}/payment-complete?payment_id=${responseData.payment_id}`
    );
  }
};
