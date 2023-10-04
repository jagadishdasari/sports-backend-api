const output = require("../output/index");
const DataServices = require("../Services/DataServices");
const utils = require("../utils/index");
const Playerprofile = require("../models/playerProfile");
const PlayerVideos = require("../models/playerVideos");
const PlayerAchivements = require("../models/playerAchivements");
const Users = require("../models/users");

let playerController = {};

playerController.createProfile = async (req, res) => {
  try {
    let data = req.body;
    data.playerId = utils.convertToObjectId(req.AuthId);

    const checkProfile = await DataServices.findOne(Playerprofile, {
      playerId: data.playerId
    });

    if (checkProfile) throw 26;

    const result = await DataServices.insertOne(Playerprofile, data);
    await DataServices.updateData(
      Users,
      { _id: data.playerId },
      { profileStatus: 1 }
    );
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

playerController.updateProfile = async (req, res) => {
  try {
    let data = req.body;
    data.playerId = utils.convertToObjectId(req.AuthId);

    const criteria = {
      playerId: data.playerId
    };

    const result = await DataServices.updateData(Playerprofile, criteria, data);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

playerController.uploadVideos = async (req, res) => {
  try {
    let data = req.body;
    data.playerId = req.AuthId;

    const result = await DataServices.createData(PlayerVideos, data);
    await DataServices.updateData(
      Users,
      { _id: data.playerId },
      { profileStatus: 2 }
    );
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

playerController.updatePlayerVideos = async (req, res) => {
  try {
    let data = req.body;
    const videoID = utils.convertToObjectId(req.params.id);

    const criteria = { _id: videoID };

    const result = await DataServices.updateData(PlayerVideos, criteria, data);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

playerController.createAchivement = async (req, res) => {
  try {
    let data = req.body;
    data.playerId = req.AuthId;

    const result = await DataServices.createData(PlayerAchivements, data);
    await DataServices.updateData(
      Users,
      { _id: data.playerId },
      { profileStatus: 3 }
    );
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

playerController.updateAchivement = async (req, res) => {
  try {
    let data = req.body;
    const ID = utils.convertToObjectId(req.params.id);

    const criteria = { _id: ID };

    const result = await DataServices.updateData(
      PlayerAchivements,
      criteria,
      data
    );
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

playerController.getPlayerProfile = async (req, res) => {
  try {
    const userID = utils.convertToObjectId(req.AuthId);

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

playerController.getPlayerVideos = async (req, res) => {
  try {
    const playerId = utils.convertToObjectId(req.AuthId);

    const result = await DataServices.getData(PlayerVideos, { playerId });
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

playerController.getPlayerAchivements = async (req, res) => {
  try {
    const playerId = utils.convertToObjectId(req.AuthId);

    const result = await DataServices.getData(PlayerAchivements, { playerId });
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

playerController.deletePlayerVideos = async (req, res) => {
  try {
    const videoID = utils.convertToObjectId(req.params.id);

    const criteria = { _id: videoID };

    const result = await DataServices.deleteOne(PlayerVideos, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

playerController.deletePlayerAchivement = async (req, res) => {
  try {
    const ID = utils.convertToObjectId(req.params.id);

    const criteria = { _id: ID };

    const result = await DataServices.deleteOne(PlayerAchivements, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

playerController.getSubscriptions = async (req, res) => {
  try {
    const result = await DataServices.getData(Subscription, { authType: 3 });
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

module.exports = playerController;
