const Users = require("../models/users");
const authJWt = require("../middleware/jwtHandler");
const output = require("../output/index");
const dataServices = require("../Services/DataServices");
const utils = require("../utils/index");
const Banners = require("../models/banners");
const Categories = require("../models/categories");
const Update = require("../models/updates");
const ContactUs = require("../models/contactus");
const Testimonials = require("../models/testimonials");
const Partners = require("../models/partners");
const SplashScreen = require("../models/splashScreen");
const Subscription = require("../models/subscriptions");
const DataServices = require("../Services/DataServices");

let adminController = {};

adminController.adminRegister = async (req, res) => {
  try {
    const existingAccount = await dataServices.findOne(Users, {
      email: req.body.email
    });
    if (existingAccount) {
      throw 23;
    }
    const passwordHash = await utils.hashPassword(req.body.password);
    const objToSave = {
      ...req.body,
      password: passwordHash,
      authType: 1,
      mobile: 9899889988
    };
    await dataServices.insertOne(Users, objToSave);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await dataServices.findOne(Users, { email });
    if (!admin) {
      throw 24;
    }
    const isPasswordMatch = await utils.comparePassword(
      password,
      admin.password
    );
    if (!isPasswordMatch) {
      throw 13;
    }
    const adminObject = {
      id: admin._id,
      authType: admin.authType
    };
    const token = authJWt.signAccessToken(adminObject);
    const result = {
      id: admin._id,
      email: admin.email,
      authType: admin.authType,
      token: token
    };
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getUser = async (req, res) => {
  try {
    const userId = utils.convertToObjectId(req.AuthId);
    const result = await dataServices.findOne(Users, { _id: userId });
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.profileUpdate = async (req, res) => {
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

adminController.getAllUsers = async (req, res) => {
  try {
    const result = await dataServices.getData(Users, { authType: 3 });
    if (result.length === 0) throw 25;
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getAllAcademies = async (req, res) => {
  try {
    const result = await dataServices.getData(Users, {
      authType: 2
    });
    if (result.length === 0) throw 25;
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.createBanners = async (req, res) => {
  try {
    let data = req.body;

    await dataServices.insertOne(Banners, data);

    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getBanners = async (req, res) => {
  try {
    const result = await dataServices.getData(Banners);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getBannerById = async (req, res) => {
  try {
    const bannerId = utils.convertToObjectId(req.params.id);
    const criteria = { _id: bannerId };
    const banner = await dataServices.findOne(Banners, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200, banner);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.updateBannerById = async (req, res) => {
  try {
    const bannerId = utils.convertToObjectId(req.params.id);
    const criteria = { _id: bannerId };
    const updateData = { ...req.body };
    await dataServices.updateData(Banners, criteria, updateData);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.deleteBannerById = async (req, res) => {
  try {
    const bannerId = utils.convertToObjectId(req.params.id);
    const criteria = { _id: bannerId };
    await dataServices.deleteOne(Banners, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.createCategory = async (req, res) => {
  try {
    let data = req.body;

    await dataServices.insertOne(Categories, data);

    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getCategories = async (req, res) => {
  try {
    const result = await dataServices.getData(Categories);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getCategoryById = async (req, res) => {
  try {
    const categoryId = utils.convertToObjectId(req.params.id);
    const criteria = { _id: categoryId };
    const result = await dataServices.findOne(Categories, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.updateCategoryById = async (req, res) => {
  try {
    const categoryId = utils.convertToObjectId(req.params.id);
    const criteria = { _id: categoryId };
    const updateData = { ...req.body };
    await dataServices.updateData(Categories, criteria, updateData);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.deleteCategoryById = async (req, res) => {
  try {
    const categoryId = utils.convertToObjectId(req.params.id);
    const criteria = { _id: categoryId };
    await dataServices.deleteOne(Categories, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getUpdates = async (req, res) => {
  try {
    const result = await dataServices.getData(Update);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.approveUpdates = async (req, res) => {
  try {
    let data = req.body;
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };

    await dataServices.updateData(Update, criteria, data);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getContactForms = async (req, res) => {
  try {
    const result = await dataServices.getData(ContactUs);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.createTestimonials = async (req, res) => {
  try {
    let data = req.body;

    await dataServices.insertOne(Testimonials, data);

    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getTestimonials = async (req, res) => {
  try {
    const result = await dataServices.getData(Testimonials);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getTestimonialsById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    const result = await dataServices.findOne(Testimonials, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.updateTestimonialById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    const updateData = { ...req.body };
    await dataServices.updateData(Testimonials, criteria, updateData);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.deleteTestimonialById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    await dataServices.deleteOne(Testimonials, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.createPartners = async (req, res) => {
  try {
    let data = req.body;

    await dataServices.insertOne(Partners, data);

    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getPartners = async (req, res) => {
  try {
    const result = await dataServices.getData(Partners);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getPartnerById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    const result = await dataServices.findOne(Partners, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.updatePartnerById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    const updateData = { ...req.body };
    await dataServices.updateData(Partners, criteria, updateData);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.deletePartnerById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    await dataServices.deleteOne(Partners, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.createSplashScreen = async (req, res) => {
  try {
    let data = req.body;

    await dataServices.insertOne(SplashScreen, data);

    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getSplashScreens = async (req, res) => {
  try {
    const result = await dataServices.getData(SplashScreen);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getSplashScreenById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    const result = await dataServices.findOne(SplashScreen, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.updateSplashScreenById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    const updateData = { ...req.body };
    await dataServices.updateData(SplashScreen, criteria, updateData);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.deleteSplashScreenById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    await dataServices.deleteOne(SplashScreen, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.createSubscription = async (req, res) => {
  try {
    let data = req.body;

    await dataServices.insertOne(Subscription, data);

    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getSubscriptions = async (req, res) => {
  try {
    const result = await dataServices.getData(Subscription);

    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.getSubscriptionById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    const result = await dataServices.findOne(Subscription, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.updateSubscriptionById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    const updateData = { ...req.body };
    await dataServices.updateData(Subscription, criteria, updateData);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.deleteSubscriptionById = async (req, res) => {
  try {
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    await dataServices.deleteOne(Subscription, criteria);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

adminController.updateAcademyProfileStatus = async (req, res) => {
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

module.exports = adminController;
