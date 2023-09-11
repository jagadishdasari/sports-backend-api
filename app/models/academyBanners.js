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
    }
  },
  {
    timestamps: true
  }
);

const AcademyBanners = mongoose.model("academybanners", schema);
module.exports = AcademyBanners;
