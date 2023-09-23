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
route.post(
  "/approveUpdate/:id",
  verify.admin,
  validator.approveUpdatesSchema,
  adminController.approveUpdates
);

// contact routes
route.get("/getContactDetails", verify.admin, adminController.getContactForms);

// testimonials routes
route.post(
  "/testimonial",
  verify.admin,
  validator.testimonialSchema,
  adminController.createTestimonials
);
route.get("/testimonials", verify.admin, adminController.getTestimonials);
route.get(
  "/testimonial/:id",
  verify.admin,
  adminController.getTestimonialsById
);
route.put(
  "/testimonial/:id",
  verify.admin,
  adminController.updateTestimonialById
);
route.delete(
  "/testimonial/:id",
  verify.admin,
  adminController.deleteTestimonialById
);

// partners routes
route.post(
  "/partner",
  verify.admin,
  validator.partnerSchema,
  adminController.createPartners
);
route.get("/partners", verify.admin, adminController.getPartners);
route.get("/partner/:id", verify.admin, adminController.getPartnerById);
route.put("/partner/:id", verify.admin, adminController.updatePartnerById);
route.delete("/partner/:id", verify.admin, adminController.deletePartnerById);

// SplashScreen Routes
route.post(
  "/splashscreen",
  verify.admin,
  validator.partnerSchema,
  adminController.createSplashScreen
);
route.get("/splashscreens", verify.admin, adminController.getSplashScreens);
route.get(
  "/splashscreen/:id",
  verify.admin,
  adminController.getSplashScreenById
);
route.put(
  "/splashscreen/:id",
  verify.admin,
  adminController.updateSplashScreenById
);
route.delete(
  "/splashscreen/:id",
  verify.admin,
  adminController.deleteSplashScreenById
);

// update profiles
route.put(
  "/updateAcademyProfile",
  verify.admin,
  validator.updateStatus,
  adminController.updateAcademyProfileStatus
);

module.exports = route;
