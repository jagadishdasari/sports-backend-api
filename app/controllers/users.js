const Users = require("../models/users");
const authJWt = require("../middleware/jwtHandler");
const output = require("../output/index");
const dataServices = require("../Services/DataServices");
const utils = require("../utils/index");
const AcademyPlayers = require("../models/academyPlayers");
const Update = require("../models/updates");
const Category = require("../models/categories");
const ContactUs = require("../models/contactus");
const Testimonials = require("../models/testimonials");
const Partners = require("../models/partners");
const SplashScreen = require("../models/splashScreen");

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

    if (!user) throw 12;
    if (user.isApproved === false) throw 27;

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
    await utils.sendSms(user.mobile);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.verifyOtp = async (req, res) => {
  try {
    let data = req.body;
    const result = await utils.verifyOtp(data);
    if (result == "OTP verified success") {
      return output.makeSuccessResponseWithMessage(res, 2, 200, result);
    } else {
      return output.makeSuccessResponseWithMessage(res, 28, 400, result);
    }
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
    let pipeline = [];

    pipeline.push(
      { $match: { isApproved: true } },
      {
        $lookup: {
          from: "categories",
          localField: "sportId",
          foreignField: "_id",
          as: "sportData"
        }
      }
    );
    const result = await dataServices.dataAggregation(Update, pipeline);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.getSports = async (req, res) => {
  try {
    const result = await dataServices.getData(Category);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.getTestimonials = async (req, res) => {
  try {
    const result = await dataServices.getData(Testimonials);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.getPartners = async (req, res) => {
  try {
    const result = await dataServices.getData(Partners);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.postContactForm = async (req, res) => {
  try {
    let data = req.body;

    const result = await dataServices.createData(ContactUs, data);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.getAcademyProfiles = async (req, res) => {
  try {
    let data = req.body;

    const userLongitude = parseFloat(data.longitude);
    const userLatitude = parseFloat(data.latitude);
    const unitValue = 1000;

    let pipeline = [
      {
        $geoNear: {
          near: { type: "Point", coordinates: [userLongitude, userLatitude] },
          distanceField: "distance",
          distanceMultiplier: 1 / unitValue,
          key: "location",
          spherical: true,
          query: { authType: 2, isApproved: true, profileStatus: 3 }
        }
      },
      {
        $lookup: {
          from: "academyprofiles",
          localField: "_id",
          foreignField: "academyId",
          as: "profileData"
        }
      },
      {
        $lookup: {
          from: "academybanners",
          localField: "_id",
          foreignField: "academyId",
          as: "bannersData"
        }
      },
      {
        $lookup: {
          from: "academyvideos",
          localField: "_id",
          foreignField: "academyId",
          as: "videosData"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          mobile: 1,
          authType: 1,
          academyName: 1,
          image: 1,
          address: 1,
          city: 1,
          state: 1,
          pincode: 1,
          isSubscribed: 1,
          distance: { $round: ["$distance", 0] },
          profileData: 1,
          bannersData: 1,
          videosData: 1
        }
      },
      { $sort: { isSubscribed: -1, distance: 1 } }
    ];

    if (data.sportId) {
      pipeline.push({
        $match: { "profileData.sports": utils.convertToObjectId(data.sportId) }
      });
    }

    if (data.city) {
      pipeline.push({
        $match: {
          city: data.city
        }
      });
    }

    let result;
    if (data.sportId) {
      result = await dataServices.dataAggregation(Users, pipeline);
    } else {
      result = await dataServices.dataAggregationWithPagination(
        Users,
        pipeline,
        data.page,
        data.pageLimit
      );
    }

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.getAcademyProfileById = async (req, res) => {
  try {
    const academyId = utils.convertToObjectId(req.params.id);

    let pipeline = [
      { $match: { _id: academyId } },
      {
        $lookup: {
          from: "academyprofiles",
          localField: "_id",
          foreignField: "academyId",
          as: "profileDta"
        }
      },
      {
        $lookup: {
          from: "academybanners",
          localField: "_id",
          foreignField: "academyId",
          as: "bannersData"
        }
      },
      {
        $lookup: {
          from: "academyvideos",
          localField: "_id",
          foreignField: "academyId",
          as: "videosData"
        }
      }
    ];

    let result = await dataServices.dataAggregation(Users, pipeline);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.getPlayerProfiles = async (req, res) => {
  try {
    let data = req.body;

    let pipeline = [
      { $match: { authType: 3, isApproved: true, profileStatus: 2 } },
      {
        $lookup: {
          from: "playerprofiles",
          localField: "_id",
          foreignField: "playerId",
          as: "profileDta"
        }
      }
    ];

    let result = await dataServices.dataAggregationWithPagination(
      Users,
      pipeline,
      data.page,
      data.pageLimit
    );

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.getPlayerProfileById = async (req, res) => {
  try {
    const ID = utils.convertToObjectId(req.params.id);

    let pipeline = [
      { $match: { _id: ID } },
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

    let result = await dataServices.dataAggregation(Users, pipeline);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.getSplashScreens = async (req, res) => {
  try {
    const result = await dataServices.getData(SplashScreen);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

userController.getPlayersByAcademyId = async (req, res) => {
  try {
    let pipeline = [];
    const ID = utils.convertToObjectId(req.params.id);
    const criteria = { academyId: ID };
    const playerIds = await dataServices.findOne(AcademyPlayers, criteria);

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

    const result = await dataServices.dataAggregation(Users, pipeline);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

module.exports = userController;
