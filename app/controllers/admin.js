const users = require("../models/users");
const authJWt = require("../middleware/jwtHandler");
const output = require("../output/index");
const dataServices = require("../Services/DataServices");
const utils = require("../utils/index");

exports.adminRegister = async (req, res) => {
  try {
    const existingAccount = await dataServices.findOne(users, {
      email: req.body.email
    });
    if (existingAccount) {
      throw 23;
    }
    const passwordHash = await utils.hashPassword(req.body.password);
    const objToSave = {
      ...req.body,
      password: passwordHash,
      authType: 1,
      mobile: 9899889988
    };
    await dataServices.insertOne(users, objToSave);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await dataServices.findOne(users, { email });
    if (!admin) {
      throw 24;
    }
    const isPasswordMatch = await utils.comparePassword(
      password,
      admin.password
    );
    if (!isPasswordMatch) {
      throw 13;
    }
    const adminObject = {
      id: admin._id,
      authType: admin.authType
    };
    const token = authJWt.signAccessToken(adminObject);
    const result = {
      id: admin._id,
      email: admin.email,
      authType: admin.authType,
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

exports.getAllUsers = async (req, res) => {
  try {
    const result = await dataServices.getData(users, { authType: 3 });
    if (result.length === 0) throw 25;
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

exports.getAllAcademies = async (req, res) => {
  try {
    const result = await dataServices.getData(users, {
      authType: 2
    });
    if (result.length === 0) throw 25;
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};
