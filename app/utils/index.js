const sha256 = require("sha256");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const globalConstants = require("../config/constants");
const msg91 = require("msg91").default;
const { v4: uuidv4 } = require("uuid");
msg91.initialize({ authKey: process.env.MSG_AUTHKEY });
const utils = {};

//this function use to make password string with salt.
utils.sha256 = function (code) {
  const base64Payload = code;
  const apiEndpoint = "/pg/v1/pay";
  const saltKey = process.env.SALT_KEY_DEV;
  const saltIndex = 1;

  const concatenatedString = `${base64Payload}${apiEndpoint}${saltKey}`;

  const sha256Hash = sha256(concatenatedString);

  const finalResult = `${sha256Hash}###${saltIndex}`;
  return finalResult;
};

utils.sha256Status = function (code) {
  const apiEndpoint = `/pg/v1/status/${process.env.PHONEPE_MER_ID_DEV}/${code}`;
  const saltKey = process.env.SALT_KEY_DEV;
  const saltIndex = 1;

  const concatenatedString = `${apiEndpoint}${saltKey}`;

  const sha256Hash = sha256(concatenatedString);

  const finalResult = `${sha256Hash}###${saltIndex}`;
  return finalResult;
};

utils.base64 = function (string) {
  const base64Payload = Buffer.from(string).toString("base64");
  return base64Payload;
};

utils.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

utils.comparePassword = function (password, userPassword) {
  return bcrypt.compare(password, userPassword);
};

utils.offset = function (page, pageLimit) {
  if (!pageLimit) {
    pageLimit = 20;
  }

  if (page == 1 || page == 0) {
    return 0;
  }
  return (page - 1) * pageLimit;
};

utils.pageLimit = function (pageLimit) {
  if (pageLimit) {
    return pageLimit;
  }
  return globalConstants.pageLimit;
};

utils.hasResult = function (totalResult, page, pageLimit) {
  const totalPage = Math.ceil(totalResult / pageLimit);
  let nextPage = false;

  if (totalPage > page) {
    nextPage = true;
  }
  return nextPage;
};

// this function make output response when return list.
utils.getListMapperWithPagination = function (
  dataList,
  resultCount,
  page,
  pageLimit
) {
  return resultCount.then(function (totalRes) {
    var makeNewResponse = {};
    makeNewResponse.list = dataList;
    makeNewResponse.hasResult = utils.hasResult(totalRes, page, pageLimit);
    makeNewResponse.resultCount = totalRes;
    return makeNewResponse;
  });
};
utils.recordCount = function (q) {
  q.push({
    $count: "recordCount"
  });
  return q;
};
utils.getBlankListMapper = function () {
  // return resultCount.then(function () {
  var makeNewResponse = {};
  console.log(makeNewResponse);
  makeNewResponse.list = [];
  makeNewResponse.hasResult = false;
  makeNewResponse.resultCount = 0;
  return makeNewResponse;
  // })
};

// this function make output response when return list.
utils.getListMapperWithPaginationFromAggregate = function (
  dataList,
  resultCount,
  page,
  pageLimit
) {
  return resultCount.then(function (totalRes) {
    var makeNewResponse = {};

    makeNewResponse.list = dataList;
    makeNewResponse.hasResult = utils.hasResult(
      totalRes[0].recordCount,
      page,
      pageLimit
    );
    makeNewResponse.resultCount = totalRes[0].recordCount;

    return makeNewResponse;
  });
};

// convert string to object in mongoose db
utils.convertToObjectId = function (id) {
  return mongoose.Types.ObjectId(id);
};

utils.generateTransactionId = function () {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);

  const transactionId = `${timestamp}${random}`;
  console.log(transactionId, "idddddddddd");
  return transactionId;
};

utils.generateOrderId = function (length = 6) {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";

  const max = characters.length - 1;
  for (let i = 0; i < length; i++) {
    code += characters[Math.floor(Math.random() * (max + 1))];
  }

  return code;
};

utils.sendSms = async function (number) {
  try {
    let otp = msg91.getOTP(process.env.SMS_TEMPLATE_ID);
    otp.send(`91${number}`);
  } catch (error) {
    console.error(error.message);
    throw error.message;
  }
};

utils.verifyOtp = async function (data) {
  try {
    let otp = msg91.getOTP(process.env.SMS_TEMPLATE_ID);
    const result = await otp.verify(`91${data.number}`, `${data.code}`);
    console.log(result.message);
    return result.message;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

module.exports = utils;
