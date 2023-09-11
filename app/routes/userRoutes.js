const express = require("express");
const verify = require("../middleware/jwtTokenUser");
const route = express.Router();
const uploadImage = require("../controllers/upload");
const imageUpload = require("../controllers/imageUploads");
const validator = require("../middleware/joi");
const userController = require("../controllers/users");
const adminController = require("../controllers/admin");

route.post("/register", validator.registerSchema, userController.register);
route.post("/login", validator.loginSchema, userController.login);
route.put("/profileupdate", verify.user, userController.profileUpdate);
route.get("/profile", verify.user, userController.getUser);

// image upload routes
route.post("/upload", uploadImage.single("image"), imageUpload.uploadfile);

route.get("/getAcademys", userController.getAcademys);

route.get("/getApprovedUpdates", userController.getApprovedUpdates);

route.get("/getSports", userController.getSports);

route.get("/getBanners", adminController.getBanners);

route.post("/contact", validator.contactSchema, userController.postContactForm);

module.exports = route;
