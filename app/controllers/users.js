const Users = require("../models/users");
const authJWt = require("../middleware/jwtHandler");
const output = require("../output/index");
const dataServices = require("../Services/DataServices");
const utils = require("../utils/index");
const AcademyPlayers = require("../models/academyPlayers");
const Update = require("../models/updates");

let userController = {};

userController.register = async (req, res) => {
  try {
    const data = req.body;

    const existingUser = await dataServices.findOne(Users, {
      mobile: data.mobile
    });
    if (existingUser) throw 1;

    const newUser = await dataServices.insertOne(Users, data);

    const userObject = { id: newUser._id, authType: newUser.authType };
    const accessToken = authJWt.signAccessToken(userObject);

    if (data.academyId) {
      const AcademyId = utils.convertToObjectId(data.academyId);

      const newUserObjectId = utils.convertToObjectId(newUser._id);

      const updatePlayers = { $push: { players: newUserObjectId } };

      await dataServices.updateData(
        AcademyPlayers,
        { academyId: AcademyId },
        updatePlayers,
        { upsert: true }
      );
    }

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

userController.login = async (req, res) => {
  try {
    const { mobile } = req.body;
    const user = await dataServices.findOne(Users, { mobile });
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

userController.getUser = async (req, res) => {
  try {
    const userId = utils.convertToObjectId(req.AuthId);
    const result = await dataServices.findOne(Users, { _id: userId });
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.profileUpdate = async (req, res) => {
  try {
    const userId = utils.convertToObjectId(req.AuthId);
    const criteria = { _id: userId };
    const updateData = req.body;
    await dataServices.updateData(Users, criteria, updateData);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.getAcademys = async (req, res) => {
  try {
    const result = await dataServices.getData(
      Users,
      { authType: 2 },
      { academyName: 1 }
    );
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.getApprovedUpdates = async (req, res) => {
  try {
    const result = await dataServices.getData(Update, { isApproved: true });
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

module.exports = userController;
