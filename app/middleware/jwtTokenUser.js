const output = require("../output/index");
const utils = require("../utils/index");
const User = require("../models/users");
const DataServices = require("../Services/DataServices");
const jwtService = require("./jwtHandler");
let authChecker = {};

authChecker.admin = async function (req, res, next) {
  try {
    if (!req.header("Authorization")) throw 1500;
    const token = req.header("Authorization");

    let payload = await jwtService.verifyAccessToken(token);
    req.user = payload;

    let userExist = await DataServices.findOne(User, {
      _id: utils.convertToObjectId(req.user.userId)
    });

    if (!userExist) throw 1002;
    if (userExist.authType != 1) throw 1500;

    req.AuthId = userExist._id;
    req.AuthType = userExist.authType;

    next();
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

authChecker.academy = async function (req, res, next) {
  try {
    if (!req.header("Authorization")) throw 1500;
    const token = req.header("Authorization");

    let payload = await jwtService.verifyAccessToken(token);
    req.user = payload;

    let userExist = await DataServices.findOne(User, {
      _id: utils.convertToObjectId(req.user.userId)
    });

    if (!userExist) throw 1002;
    if (userExist.authType != 2) throw 1500;

    req.AuthId = userExist._id;
    req.AuthType = userExist.authType;
    req.Subscribe = userExist.isSubscribed;

    next();
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

authChecker.player = async function (req, res, next) {
  try {
    if (!req.header("Authorization")) throw 1500;
    const token = req.header("Authorization");

    let payload = await jwtService.verifyAccessToken(token);
    req.user = payload;

    let userExist = await DataServices.findOne(User, {
      _id: utils.convertToObjectId(req.user.userId)
    });

    if (!userExist) throw 1002;
    if (userExist.authType != 3) throw 1500;

    req.AuthId = userExist._id;
    req.AuthType = userExist.authType;
    req.Subscribe = userExist.isSubscribed;

    next();
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

authChecker.manager = async function (req, res, next) {
  try {
    if (!req.header("Authorization")) throw 1500;
    const token = req.header("Authorization");

    let payload = await jwtService.verifyAccessToken(token);
    req.user = payload;

    let userExist = await DataServices.findOne(User, {
      _id: utils.convertToObjectId(req.user.userId)
    });

    if (!userExist) throw 1002;
    if (userExist.authType != 4) throw 1500;

    req.AuthId = userExist._id;
    req.AuthType = userExist.authType;

    next();
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

authChecker.employ = async function (req, res, next) {
  try {
    if (!req.header("Authorization")) throw 1500;
    const token = req.header("Authorization");

    let payload = await jwtService.verifyAccessToken(token);
    req.user = payload;

    let userExist = await DataServices.findOne(User, {
      _id: utils.convertToObjectId(req.user.userId)
    });

    if (!userExist) throw 1002;
    if (userExist.authType != 5) throw 1500;

    req.AuthId = userExist._id;
    req.AuthType = userExist.authType;

    next();
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

authChecker.user = async function (req, res, next) {
  try {
    if (!req.header("Authorization")) throw 1500;
    const token = req.header("Authorization");

    let payload = await jwtService.verifyAccessToken(token);
    req.user = payload;

    let userExist = await DataServices.findOne(User, {
      _id: utils.convertToObjectId(req.user.userId)
    });

    if (!userExist) throw 1002;

    req.AuthId = userExist._id;
    req.AuthType = userExist.authType;

    next();
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

module.exports = authChecker;
