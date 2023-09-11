const express = require("express");
const verify = require("../middleware/jwtTokenUser");
const route = express.Router();
const uploadImage = require("../controllers/upload");
const imageUpload = require("../controllers/imageUploads");
const validator = require("../middleware/joi");
const adminController = require("../controllers/admin");

// user routes
route.post("/login", validator.adminLoginSchema, adminController.adminLogin);
route.post(
  "/register",
  validator.adminRegisterSchema,
  adminController.adminRegister
);
route.get("/users", verify.admin, adminController.getAllUsers);
route.get("/merchantusers", verify.admin, adminController.getAllAcademies);

// image upload routes
route.post("/upload", uploadImage.single("image"), imageUpload.uploadfile);

// Banner Routes
route.post(
  "/banner",
  verify.admin,
  validator.bannerSchema,
  adminController.createBanners
);
route.get("/banners", verify.admin, adminController.getBanners);
route.get("/banner/:id", verify.admin, adminController.getBannerById);
route.put("/banner/:id", verify.admin, adminController.updateBannerById);
route.delete("/banner/:id", verify.admin, adminController.deleteBannerById);

// category Routes
route.post(
  "/category",
  verify.admin,
  validator.categorySchema,
  adminController.createCategory
);
route.get("/category", verify.admin, adminController.getCategories);
route.get("/category/:id", verify.admin, adminController.getCategoryById);
route.put("/category/:id", verify.admin, adminController.updateCategoryById);
route.delete("/category/:id", verify.admin, adminController.deleteCategoryById);

// update routes
route.get("/getUpdates", verify.admin, adminController.getUpdates);
route.post("/approveUpdate/:id", verify.admin, adminController.approveUpdates);

// contact routes
route.get("/getContactDetails", verify.admin, adminController.getContactForms);

module.exports = route;
