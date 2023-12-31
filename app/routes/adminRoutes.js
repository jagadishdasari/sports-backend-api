const express = require("express");
const verify = require("../middleware/jwtTokenUser");
const route = express.Router();
const uploadImage = require("../controllers/upload");
const imageUpload = require("../controllers/imageUploads");
const validator = require("../middleware/joi");
const adminController = require("../controllers/admin");
const userController = require("../controllers/users");

// user routes
route.post("/login", validator.adminLoginSchema, adminController.adminLogin);
route.post(
  "/register",
  validator.adminRegisterSchema,
  adminController.adminRegister
);
route.get("/users", verify.admin, adminController.getAllUsers);
route.get("/allacademies", verify.admin, adminController.getAllAcademies);

// manager Routes
route.post("/manager/add", validator.managerSchema, userController.register);
route.get("/managers", verify.admin, adminController.getAllManagers);
route.get("/manager/:id", verify.admin, userController.getUserById);
route.put(
  "/manager/update/:id",
  verify.admin,
  validator.managerSchema,
  adminController.managerUpdate
);
route.delete("/manager/:id", verify.admin, adminController.deleteManagerById);
route.get(
  "/manager/employ/referrals/:id",
  verify.admin,
  adminController.getEmployeReferralsByEmpId
);

// Employ Routes
route.get("/employs", verify.admin, adminController.getAllEmploys);

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

// Subscription Routes
route.post(
  "/subscription",
  verify.admin,
  validator.subscriptionSchema,
  adminController.createSubscription
);
route.get("/subscriptions", verify.admin, adminController.getSubscriptions);
route.get(
  "/subscription/:id",
  verify.admin,
  adminController.getSubscriptionById
);
route.put(
  "/subscription/:id",
  verify.admin,
  adminController.updateSubscriptionById
);
route.delete(
  "/subscription/:id",
  verify.admin,
  adminController.deleteSubscriptionById
);

// update profiles
route.put(
  "/updateAcademyProfile",
  verify.admin,
  validator.updateStatus,
  adminController.updateAcademyProfileStatus
);

module.exports = route;
