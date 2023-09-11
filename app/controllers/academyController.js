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
    data.academyId = req.AuthId;

    const result = await DataServices.createData(AcademyBanners, data);
    return output.makeSuccessResponseWithMessage(res, 6, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.uploadVideos = async (req, res) => {
  try {
    let data = req.body;
    data.academyId = req.AuthId;

    const result = await DataServices.createData(AcademyVideos, data);
    return output.makeSuccessResponseWithMessage(res, 6, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.getUploadBanners = async (req, res) => {
  try {
    const userID = utils.convertToObjectId(req.AuthId);

    const result = await DataServices.getData(AcademyBanners, {
      academyId: userID
    });
    return output.makeSuccessResponseWithMessage(res, 6, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.getUploadVideos = async (req, res) => {
  try {
    const userID = utils.convertToObjectId(req.AuthId);

    const result = await DataServices.getData(AcademyVideos, {
      academyId: userID
    });
    return output.makeSuccessResponseWithMessage(res, 6, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.getCreatedProfile = async (req, res) => {
  try {
    const userID = utils.convertToObjectId(req.AuthId);

    const result = await DataServices.getData(AcademyProfile, {
      academyId: userID
    });
    return output.makeSuccessResponseWithMessage(res, 6, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.deleteVideosById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    await dataServices.deleteOne(AcademyVideos, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.deleteBannersById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    await dataServices.deleteOne(AcademyBanners, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

module.exports = academyController;
