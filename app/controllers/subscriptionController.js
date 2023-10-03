const output = require("../output/index");
const utils = require("../utils/index");
const paymentFunctions = require("../payment");

let subscribeController = {};

subscribeController.checkout = async (req, res) => {
  try {
    let data = req.body;
    data.merchantId = "MERCHANTUAT";
    data.merchantTransactionId = utils.generateTransactionId();
    data.merchantUserId = req.AuthId;
    data.message = `payment for order placed ${data.merchantOrderId}`;
    data.mobileNumber = "9999999999";
    data.redirectUrl = `https://dashboard.kredangan.com/#/payment/status/${data.merchantTransactionId}`;
    data.callbackUrl = "https://webhook.site/callback-url";
    data.paymentInstrument = {
      type: "PAY_PAGE"
    };

    const jsonString = JSON.stringify(data);

    const request = utils.base64(jsonString);

    console.log(request, "request");

    const XVerify = utils.sha256(request);

    console.log(XVerify, "x-verify");

    const result = await paymentFunctions.checkout(request, XVerify);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

module.exports = subscribeController;
