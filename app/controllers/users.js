const users = require("../models/users");
const authJWt = require("../middleware/jwtHandler");
const output = require("../output/index");
const dataServices = require("../Services/DataServices");
const utils = require("../utils/index");

exports.register = async (req, res) => {
  try {
    const { mobile } = req.body;

    const existingUser = await dataServices.findOne(users, { mobile });
    if (existingUser) {
      throw 1;
    }

    const newUser = await dataServices.insertOne(users, { ...req.body });

    const userObject = {
      id: newUser._id,
      authType: newUser.authType
    };

    const accessToken = authJWt.signAccessToken(userObject);

    const result = {
      id: newUser._id,
      mobile: newUser.mobile,
      authType: newUser.authType,
      token: accessToken
    };

    return output.makeSuccessResponseWithMessage(res, 6, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { mobile } = req.body;
    const user = await dataServices.findOne(users, { mobile });
    if (!user) {
      throw 12;
    }
    const userObject = {
      id: user._id,
      authType: user.authType
    };
    const token = authJWt.signAccessToken(userObject);
    const result = {
      id: user._id,
      mobile: user.mobile,
      authType: user.authType,
      token: token
    };
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = utils.convertToObjectId(req.AuthId);
    const result = await dataServices.findOne(users, { _id: userId });
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

exports.profileUpdate = async (req, res) => {
  try {
    const userId = utils.convertToObjectId(req.AuthId);
    const criteria = { _id: userId };
    const updateData = req.body;
    await dataServices.updateData(users, criteria, updateData);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};
