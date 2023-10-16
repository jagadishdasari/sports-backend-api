const express = require("express");
const verify = require("../middleware/jwtTokenUser");
const route = express.Router();
const validator = require("../middleware/joi");
const userController = require("../controllers/users");
const employController = require("../controllers/employController");

// Auth routes
route.post("/login", validator.loginSchema, userController.login);
route.get("", verify.employ, employController.getProfile);
route.get(
  "/getReferredUsers",
  verify.employ,
  employController.getReferralAcademies
);

module.exports = route;
