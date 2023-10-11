const express = require("express");
const verify = require("../middleware/jwtTokenUser");
const route = express.Router();
const validator = require("../middleware/joi");
const userController = require("../controllers/users");
const managerController = require("../controllers/managerController");

// Auth routes
route.post("/login", validator.loginSchema, userController.login);
route.get("", verify.manager, managerController.getProfile);

// employee routes
route.post(
  "/employ/add",
  verify.manager,
  validator.managerSchema,
  userController.register
);
route.get("/employs", verify.manager, managerController.getAllEmploys);
route.get("/employ/:id", verify.manager, userController.getUserById);
route.put(
  "/employ/update/:id",
  verify.manager,
  validator.managerSchema,
  managerController.employUpdate
);
route.delete("/employ/:id", verify.manager, managerController.deleteEmployById);

module.exports = route;
