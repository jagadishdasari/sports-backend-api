const output = require("../output/index");
const DataServices = require("../Services/DataServices");
const utils = require("../utils/index");
const Users = require("../models/users");

let employController = {};

employController.getProfile = async (req, res) => {
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

module.exports = employController;
