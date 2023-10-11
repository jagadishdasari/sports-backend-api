const output = require("../output/index");
const DataServices = require("../Services/DataServices");
const utils = require("../utils/index");
const Users = require("../models/users");

let managerController = {};

managerController.getProfile = async (req, res) => {
  try {
    const userId = utils.convertToObjectId(req.AuthId);

    let pipeline = [];

    pipeline.push(
      {
        $match: { _id: userId }
      },
      {
        $lookup: {
          from: "referrals",
          localField: "_id",
          foreignField: "userId",
          as: "referralData"
        }
      },
      {
        $unwind: "$referralData"
      },
      {
        $project: {
          name: 1,
          email: 1,
          mobile: 1,
          address: 1,
          city: 1,
          pincode: 1,
          state: 1,
          code: "$referralData.code"
        }
      }
    );

    const result = await DataServices.dataAggregation(Users, pipeline);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result[0]);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

managerController.getAllEmploys = async (req, res) => {
  try {
    const userId = utils.convertToObjectId(req.AuthId);
    const result = await DataServices.getData(Users, {
      authType: 5,
      managerId: userId
    });
    if (result.length === 0) throw 25;
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

managerController.employUpdate = async (req, res) => {
  try {
    const userId = utils.convertToObjectId(req.params.id);
    const criteria = { _id: userId };
    const updateData = req.body;
    await DataServices.updateData(Users, criteria, updateData);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

managerController.deleteEmployById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    await DataServices.deleteOne(Users, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

module.exports = managerController;
