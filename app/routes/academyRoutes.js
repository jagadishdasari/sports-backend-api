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

module.exports = route;
