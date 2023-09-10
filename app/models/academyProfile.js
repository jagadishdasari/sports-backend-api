const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    academyId: {
      type: mongoose.Types.ObjectId,
      ref: "users"
    },
    about: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    academyImage: {
      type: String,
      required: true
    },
    academyBanners: [],
    sportsCount: {
      type: Number
    },
    coachCount: {
      type: Number
    },
    videosUrl: []
  },
  {
    timestamps: true
  }
);

const AcademyProfile = mongoose.model("academyprofile", schema);
module.exports = AcademyProfile;
