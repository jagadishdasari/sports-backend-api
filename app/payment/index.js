const axios = require("axios");

let paymentFunctions = {};

paymentFunctions.checkout = function(Request, XVerify) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = JSON.stringify({ request: Request });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
        headers: {
          "X-VERIFY": XVerify,
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
