const express = require("express");
const verify = require("../middleware/jwtTokenUser");
const route = express.Router();
const uploadImage = require("../controllers/upload");
const imageUpload = require("../controllers/imageUploads");
const validator = require("../middleware/joi");
const userController = require("../controllers/users");

route.post("/login", validator.loginSchema, userController.login);

module.exports = route;
