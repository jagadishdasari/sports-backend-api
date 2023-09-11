const output = require("../output/index");
const dataServices = require("../Services/DataServices");
const utils = require("../utils/index");
const AcademyProfile = require("../models/academyProfile");
const Update = require("../models/updates");
const DataServices = require("../Services/DataServices");
const AcademyBanners = require("../models/academyBanners");
const AcademyVideos = require("../models/academyVideos");

let academyController = {};

academyController.createProfile = async (req, res) => {
  try {
    let data = req.body;
    data.academyId = req.AuthId;

    const result = await dataServices.insertOne(AcademyProfile, data);
    return output.makeSuccessResponseWithMessage(res, 6, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.createUpdate = async (req, res) => {
  try {
    let data = req.body;

    const result = await DataServices.createData(Update, data);
    return output.makeSuccessResponseWithMessage(res, 6, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.uploadBanners = async (req, res) => {
  try {
    let data = req.body;
    data.academyId = req.user.userId;

    const result = await DataServices.createData(AcademyBanners, data);
    return output.makeSuccessResponseWithMessage(res, 6, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.uploadVideos = async (req, res) => {
  try {
    let data = req.body;
    data.academyId = req.user.userId;

    const result = await DataServices.createData(AcademyVideos, data);
    return output.makeSuccessResponseWithMessage(res, 6, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

module.exports = academyController;
