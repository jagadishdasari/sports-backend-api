const express = require("express");
const verify = require("../middleware/jwtTokenUser");
const route = express.Router();
// const uploadImage = require("../controllers/upload");
// const imageUpload = require("../controllers/imageUploads");
const upload = require("../middleware/upload");
const s3Upload = require("../middleware/upload/s3");
const validator = require("../middleware/joi");
const userController = require("../controllers/users");
const adminController = require("../controllers/admin");
const output = require("../output/index");

route.post("/register", validator.registerSchema, userController.register);
route.post("/login", validator.loginSchema, userController.login);
route.post("/verify", validator.verifySchema, userController.verifyOtp);
route.post(
  "/verifyRefCode",
  validator.verifyReferralSchema,
  userController.verifyRefCode
);
route.put(
  "/profileupdate",
  verify.user,
  validator.registerSchema,
  userController.profileUpdate
);
route.get("/profile", verify.user, userController.getUser);

// image upload routes
// route.post("/upload", uploadImage.single("image"), imageUpload.uploadfile);

route.post(
  "/upload",
  upload.oneFile("image"),
  s3Upload.uploadSingleMediaToS3("image"),
  function(req, res) {
    output.makeSuccessResponseWithMessage(res, 2, 200, req.body.location);
  }
);

route.get("/getAcademys", userController.getAcademys);

route.get("/getApprovedUpdates", userController.getApprovedUpdates);

route.get("/getSports", userController.getSports);

route.get("/getBanners", adminController.getBanners);

route.post(
  "/getAcademyProfiles",
  validator.getAcademySchema,
  userController.getAcademyProfiles
);

route.post(
  "/getPlayerProfiles",
  validator.getAcademySchema,
  userController.getPlayerProfiles
);

route.get("/getAcademyProfileById/:id", userController.getAcademyProfileById);

route.get("/getPlayerProfileById/:id", userController.getPlayerProfileById);

route.post("/contact", validator.contactSchema, userController.postContactForm);

route.get("/testimonials", userController.getTestimonials);

route.get("/partners", userController.getPartners);

route.get("/splashscreen", userController.getSplashScreens);

route.get("/getPlayersByAcademyId/:id", userController.getPlayersByAcademyId);

// common Api
route.get(
  "/getReferralsById/:id",
  verify.user,
  adminController.getEmployeReferralsByEmpId
);

module.exports = route;
