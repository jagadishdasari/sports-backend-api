const output = require("../output/index");
const dataServices = require("../Services/DataServices");
const utils = require("../utils/index");
const AcademyProfile = require("../models/academyProfile");

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

module.exports = academyController;
