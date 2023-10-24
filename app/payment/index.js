const axios = require("axios");
const utils = require("../utils/index");

let paymentFunctions = {};

paymentFunctions.checkout = function(Request, XVerify) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = JSON.stringify({ request: Request });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
        headers: {
          "X-VERIFY": XVerify,
          "Content-Type": "application/json"
        },
        data: data
      };
      const result = await axios.request(config);
      resolve(JSON.stringify(result.data));
    } catch (error) {
      console.error("Error:", error.message);
      reject(error);
    }
  });
};

paymentFunctions.callStatus = function(Id) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      let XVerify = utils.sha256Status(Id);
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env
          .MERCHANT_ID}/${Id}`,
        headers: {
          "X-VERIFY": XVerify,
          "X-MERCHANT-ID": `${process.env.MERCHANT_ID}`,
          "Content-Type": "application/json"
        },
        data: data
      };
      const result = await axios.request(config);
      console.log(result, "result");
      resolve(JSON.stringify(result.data));
    } catch (error) {
      console.error("Error:", error.message);
      reject(error);
    }
  });
};

module.exports = paymentFunctions;
