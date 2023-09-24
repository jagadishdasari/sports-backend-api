const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    playerId: {
      type: mongoose.Types.ObjectId,
      ref: "users"
    },
    about: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String,
      required: true
    },
    game: {
      type: String,
      required: true
    },
    playing: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    backgroundImage: {
      type: String,
      required: true
    },
    facebookLink: {
      type: String
    },
    twitterLink: {
      type: String
    },
    instagramLink: {
      type: String
    },
    youtubeLink: {
      type: String
    },
    carrierStartedAt: {
      type: String,
      required: true
    },
    goal: {
      type: String
    },
    reasonToChoosePart: {
      type: String
    },
    requirementFromSponcers: {
      type: String
    },
    schoolCount: {
      type: Number
    },
    tournmentsCount: {
      type: Number
    },
    universityCount: {
      type: Number
    },
    districtCount: {
      type: Number
    },
    nationalsCount: {
      type: Number
    },
    internationalsCount: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const PlayerProfile = mongoose.model("playerprofile", schema);
module.exports = PlayerProfile;
