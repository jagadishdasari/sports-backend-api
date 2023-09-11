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
    sportsCount: {
      type: Number
    },
    coachCount: {
      type: Number
    },
    successRate: {
      type: Number
    },
    students: {
      type: Number
    },
    sports: [
      {
        type: mongoose.Types.ObjectId,
        ref: "categories"
      }
    ]
  },
  {
    timestamps: true
  }
);

const AcademyProfile = mongoose.model("academyprofile", schema);
module.exports = AcademyProfile;
