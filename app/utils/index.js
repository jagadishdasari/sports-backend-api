const sha256 = require("sha256");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const globalConstants = require("../config/constants");
const msg91 = require("msg91").default;
msg91.initialize({ authKey: process.env.MSG_AUTHKEY });
const utils = {};

//this function use to make password string with salt.
utils.sha256 = function(password) {
  return sha256(password + "NB%$#$^&*(Y&*SDF");
};

utils.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

utils.comparePassword = function(password, userPassword) {
  return bcrypt.compare(password, userPassword);
};

utils.offset = function(page, pageLimit) {
  if (!pageLimit) {
    pageLimit = 20;
  }

  if (page == 1 || page == 0) {
    return 0;
  }
  return (page - 1) * pageLimit;
};

utils.pageLimit = function(pageLimit) {
  if (pageLimit) {
    return pageLimit;
  }
  return globalConstants.pageLimit;
};

utils.hasResult = function(totalResult, page, pageLimit) {
  const totalPage = Math.ceil(totalResult / pageLimit);
  let nextPage = false;

  if (totalPage > page) {
    nextPage = true;
  }
  return nextPage;
};

// this function make output response when return list.
utils.getListMapperWithPagination = function(
  dataList,
  resultCount,
  page,
  pageLimit
) {
  return resultCount.then(function(totalRes) {
    var makeNewResponse = {};
    makeNewResponse.list = dataList;
    makeNewResponse.hasResult = utils.hasResult(totalRes, page, pageLimit);
    makeNewResponse.resultCount = totalRes;
    return makeNewResponse;
  });
};
utils.recordCount = function(q) {
  q.push({
    $count: "recordCount"
  });
  return q;
};
utils.getBlankListMapper = function() {
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
utils.getListMapperWithPaginationFromAggregate = function(
  dataList,
  resultCount,
  page,
  pageLimit
) {
  return resultCount.then(function(totalRes) {
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
utils.convertToObjectId = function(id) {
  return mongoose.Types.ObjectId(id);
};

utils.sendSms = async function(number) {
  try {
    let otp = msg91.getOTP(process.env.SMS_TEMPLATE_ID);
    otp.send(`91${number}`);
  } catch (error) {
    console.error(error.message);
    throw error.message;
  }
};

utils.verifyOtp = async function(data) {
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
