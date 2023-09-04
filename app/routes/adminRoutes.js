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

module.exports = route;
