const express = require("express");
const verify = require("../middleware/jwtTokenUser");
const route = express.Router();
const validator = require("../middleware/joi");
const academyController = require("../controllers/academyController");

route.post(
  "/createProfile",
  verify.academy,
  validator.academyProfileSchema,
  academyController.createProfile
);

route.post(
  "/createUpdate",
  verify.academy,
  validator.notificationSchema,
  academyController.createUpdate
);

route.post(
  "/createBanners",
  verify.academy,
  validator.uploadBannerSchema,
  academyController.uploadBanners
);

route.post(
  "/createVideos",
  verify.academy,
  validator.uploadVideoSchema,
  academyController.uploadVideos
);

route.get("/getVideos", verify.academy, academyController.getUploadVideos);

route.get("/getBanners", verify.academy, academyController.getUploadBanners);

route.get(
  "/getAcademyProfile",
  verify.academy,
  academyController.getCreatedProfile
);

route.delete(
  "/deleteBannerById/:id",
  verify.academy,
  academyController.deleteBannersById
);

route.delete(
  "/deleteVideoById/:id",
  verify.academy,
  academyController.deleteVideosById
);

module.exports = route;
