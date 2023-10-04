const express = require("express");
const verify = require("../middleware/jwtTokenUser");
const route = express.Router();
const validator = require("../middleware/joi");
const playerController = require("../controllers/playerController");
const subscribeController = require("../controllers/subscriptionController");

// Profile Routes
route.post(
  "/profile",
  verify.player,
  validator.playerProfileSchema,
  playerController.createProfile
);

route.put(
  "/updateProfile",
  verify.player,
  validator.playerProfileSchema,
  playerController.updateProfile
);

route.post(
  "/createVideos",
  verify.player,
  validator.uploadVideoSchema,
  playerController.uploadVideos
);

route.put(
  "/updatePlayerVideos/:id",
  verify.player,
  validator.uploadVideoSchema,
  playerController.updatePlayerVideos
);

route.post(
  "/createAchivement",
  verify.player,
  validator.createAchivement,
  playerController.createAchivement
);

route.put(
  "/updateAchivement/:id",
  verify.player,
  validator.createAchivement,
  playerController.updateAchivement
);

route.get("/profile", verify.player, playerController.getPlayerProfile);

route.get("/getPlayerVideos", verify.player, playerController.getPlayerVideos);

route.get(
  "/getPlayerAchivements",
  verify.player,
  playerController.getPlayerAchivements
);

route.delete(
  "/video/delete/:id",
  verify.player,
  playerController.deletePlayerVideos
);

route.delete(
  "/achivement/delete/:id",
  verify.player,
  playerController.deletePlayerAchivement
);

route.post(
  "/checkout",
  verify.player,
  validator.checkoutSchema,
  subscribeController.checkout
);

route.get("/check/status/:id", verify.player, subscribeController.callStatus);

route.get("/subscriptions", verify.player, playerController.getSubscriptions);

module.exports = route;
