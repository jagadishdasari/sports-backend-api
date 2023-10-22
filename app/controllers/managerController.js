const output = require("../output/index");
const DataServices = require("../Services/DataServices");
const utils = require("../utils/index");
const Users = require("../models/users");
const Referrals = require("../models/referrals");

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

    let pipeline = [];

    pipeline.push(
      { $match: { authType: 5, managerId: userId } },
      {
        $lookup: {
          from: "referrals",
          foreignField: "userId",
          localField: "_id",
          pipeline: [
            {
              $project: {
                code: 1,
                referredIds: 1
              }
            }
          ],
          as: "referralData"
        }
      },
      {
        $unwind: "$referralData"
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          name: 1,
          email: 1,
          mobile: 1,
          address: 1,
          city: 1,
          pincode: 1,
          state: 1,
          code: "$referralData.code",
          createdAt: 1,
          referralsCount: { $size: "$referralData.referredIds" }
        }
      }
    );

    const result = await DataServices.dataAggregation(Users, pipeline);

    if (result.output === 0) throw 25;
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

managerController.getReferralAcademiesByEmpId = async (req, res) => {
  try {
    const userId = utils.convertToObjectId(req.params.id);

    let pipeline = [];

    pipeline.push(
      { $match: { userId: userId } },
      {
        $lookup: {
          from: "users",
          localField: "referredIds",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                name: 1,
                email: 1,
                mobile: 1,
                academyName: 1,
                address: 1,
                city: 1,
                pincode: 1,
                state: 1,
                isApproved: 1,
                isSubscribed: 1,
                subscribedDate: 1
              }
            }
          ],
          as: "referredUsers"
        }
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          code: 1,
          referredUsers: 1
        }
      }
    );

    const result = await DataServices.dataAggregation(Referrals, pipeline);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

module.exports = managerController;
