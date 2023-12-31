const output = require("../output/index");
const dataServices = require("../Services/DataServices");
const utils = require("../utils/index");
const AcademyProfile = require("../models/academyProfile");
const Users = require("../models/users");
const Update = require("../models/updates");
const DataServices = require("../Services/DataServices");
const AcademyBanners = require("../models/academyBanners");
const AcademyVideos = require("../models/academyVideos");
const AcademyPlayers = require("../models/academyPlayers");
const Subscription = require("../models/subscriptions");

let academyController = {};

academyController.createProfile = async (req, res) => {
  try {
    let data = req.body;
    data.academyId = utils.convertToObjectId(req.AuthId);

    const checkProfile = await DataServices.findOne(AcademyProfile, {
      academyId: data.academyId
    });

    if (checkProfile) throw 22;

    const result = await dataServices.insertOne(AcademyProfile, data);
    await dataServices.updateData(
      Users,
      { _id: data.academyId },
      { profileStatus: 1 }
    );
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.updateProfile = async (req, res) => {
  try {
    let data = req.body;
    data.academyId = utils.convertToObjectId(req.AuthId);

    const criteria = { academyId: data.academyId };

    const result = await dataServices.updateData(
      AcademyProfile,
      criteria,
      data
    );
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.createUpdate = async (req, res) => {
  try {
    let data = req.body;
    data.userId = utils.convertToObjectId(req.AuthId);

    if (!req.Subscribe) throw 30;

    const result = await DataServices.createData(Update, data);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.uploadBanners = async (req, res) => {
  try {
    let data = req.body;
    data.academyId = utils.convertToObjectId(req.AuthId);

    if (!req.Subscribe) {
      const checkBanners = await DataServices.getData(AcademyBanners, {
        academyId: data.academyId
      });

      if (checkBanners.length > 1) throw 30;
    }

    const result = await DataServices.createData(AcademyBanners, data);
    await dataServices.updateData(
      Users,
      { _id: data.academyId },
      { profileStatus: 2 }
    );
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.uploadVideos = async (req, res) => {
  try {
    let data = req.body;
    data.academyId = utils.convertToObjectId(req.AuthId);

    if (!req.Subscribe) {
      const checkVideos = await DataServices.getData(AcademyVideos, {
        academyId: data.academyId
      });

      if (checkVideos.length > 1) throw 30;
    }

    const result = await DataServices.createData(AcademyVideos, data);
    await dataServices.updateData(
      Users,
      { _id: data.academyId },
      { profileStatus: 3 }
    );
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
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
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
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
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.getCreatedProfile = async (req, res) => {
  try {
    const userID = utils.convertToObjectId(req.AuthId);

    let pipeline = [];

    pipeline.push(
      { $match: { academyId: userID } },
      {
        $lookup: {
          from: "referrals",
          localField: "academyId",
          foreignField: "userId",
          pipeline: [
            {
              $project: {
                userId: 1,
                code: 1
              }
            }
          ],
          as: "referralData"
        }
      }
    );

    const result = await DataServices.dataAggregation(AcademyProfile, pipeline);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
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

academyController.getPlayers = async (req, res) => {
  try {
    let pipeline = [];
    const ID = utils.convertToObjectId(req.AuthId);
    const criteria = { academyId: ID };
    const playerIds = await DataServices.findOne(AcademyPlayers, criteria);

    pipeline.push(
      { $match: { _id: { $in: playerIds.players } } },
      {
        $lookup: {
          from: "playerprofiles",
          localField: "_id",
          foreignField: "playerId",
          as: "profileData"
        }
      },
      {
        $lookup: {
          from: "academyprofiles",
          localField: "academyId",
          foreignField: "academyId",
          pipeline: [{ $project: { logo: 1, academyImage: 1, about: 1 } }],
          as: "academyProfileData"
        }
      },
      {
        $lookup: {
          from: "playervideos",
          localField: "_id",
          foreignField: "playerId",
          as: "videosData"
        }
      },
      {
        $lookup: {
          from: "playerachivements",
          localField: "_id",
          foreignField: "playerId",
          as: "AchivementsData"
        }
      }
    );

    const result = await DataServices.dataAggregation(Users, pipeline);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.getPlayerById = async (req, res) => {
  try {
    const userID = utils.convertToObjectId(req.params.id);

    let pipeline = [
      { $match: { _id: userID } },
      {
        $lookup: {
          from: "playerprofiles",
          localField: "_id",
          foreignField: "playerId",
          as: "profileDta"
        }
      },
      {
        $lookup: {
          from: "academyprofiles",
          localField: "academyId",
          foreignField: "academyId",
          pipeline: [{ $project: { logo: 1, academyImage: 1, about: 1 } }],
          as: "academyProfileData"
        }
      },
      {
        $lookup: {
          from: "playervideos",
          localField: "_id",
          foreignField: "playerId",
          as: "videosData"
        }
      },
      {
        $lookup: {
          from: "playerachivements",
          localField: "_id",
          foreignField: "playerId",
          as: "AchivementsData"
        }
      }
    ];

    let result = await DataServices.dataAggregation(Users, pipeline);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.approvePlayer = async (req, res) => {
  try {
    let data = req.body;
    const ID = utils.convertToObjectId(data.id);

    const criteria = { _id: ID };

    await DataServices.updateData(Users, criteria, data);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

academyController.getSubscriptions = async (req, res) => {
  try {
    const result = await DataServices.getData(Subscription, { authType: 2 });
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

module.exports = academyController;
