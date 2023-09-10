const Users = require("../models/users");
const authJWt = require("../middleware/jwtHandler");
const output = require("../output/index");
const dataServices = require("../Services/DataServices");
const utils = require("../utils/index");
const Banners = require("../models/banners");
const Categories = require("../models/categories");
const Update = require("../models/updates");

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
    const Id = utils.convertToObjectId(req.params.id);
    const criteria = { _id: Id };
    const updateData = { isApproved: true };

    await dataServices.updateData(Update, criteria, updateData);
    return output.makeSuccessResponseWithMessage(res, 2, 200);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
};

module.exports = adminController;
