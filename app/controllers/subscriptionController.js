const output = require("../output/index");
const utils = require("../utils/index");
const paymentFunctions = require("../payment");
const DataServices = require("../Services/DataServices");
const Users = require("../models/users");
const Checkout = require("../models/checkout");
const Subscription = require("../models/subscriptions");

let subscribeController = {};

subscribeController.checkout = async (req, res) => {
  try {
    let data = req.body;

    const subscriptionData = await DataServices.findOne(Subscription, {
      _id: utils.convertToObjectId(data.subscriptionId)
    });

    data.amount = subscriptionData.cost - subscriptionData.discount * 100;
    data.merchantId = process.env.PHONEPE_MER_ID_DEV;
    data.merchantTransactionId = data.subscriptionId;
    data.merchantOrderId = utils.generateOrderId(9);
    data.merchantUserId = req.AuthId;
    data.message = `payment for order placed ${data.merchantOrderId}`;
    data.redirectUrl = `https://dashboard.kredangan.com/#/payment/status/${data.merchantTransactionId}`;
    data.callbackUrl = "https://webhook.site/callback-url";
    data.paymentInstrument = {
      type: "PAY_PAGE"
    };

    const jsonString = JSON.stringify(data);

    const request = utils.base64(jsonString);

    const XVerify = utils.sha256(request);

    const result = await paymentFunctions.checkout(request, XVerify);

    return output.makeSuccessResponseWithMessage(
      res,
      2,
      200,
      JSON.parse(result)
    );
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

subscribeController.callStatus = async (req, res) => {
  try {
    let Id = req.params.id;

    const currentDate = new Date();
    const utcDateAsString = currentDate.toUTCString();

    const response = await paymentFunctions.callStatus(Id);
    const result = JSON.parse(response);

    const objToSend = {
      status: result.success,
      code: result.code,
      message: result.message,
      merchantTxnId: result.data.merchantTransactionId,
      txnId: result.data.transactionId,
      amount: result.data.amount / 100,
      state: result.data.state
    };

    if (objToSend.status) {
      let data = {};
      data.userId = req.AuthId;
      data.subscriptionId = objToSend.merchantTxnId;
      data.transactionId = objToSend.txnId;
      data.amount = objToSend.amount;
      data.subscriptionDate = utcDateAsString;

      const criteria = { _id: utils.convertToObjectId(req.AuthId) };
      const dataToSet = { isSubscribed: true, subscribedDate: utcDateAsString };

      await DataServices.createData(Checkout, data);
      await DataServices.updateData(Users, criteria, dataToSet);
    }

    return output.makeSuccessResponseWithMessage(res, 2, 200, objToSend);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

module.exports = subscribeController;
