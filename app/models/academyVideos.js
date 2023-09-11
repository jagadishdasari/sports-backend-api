const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    academyId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const AcademyVideos = mongoose.model("academyvideos", schema);
module.exports = AcademyVideos;
