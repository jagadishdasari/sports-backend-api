const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    wBanner: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Banners = mongoose.model("banners", schema);
module.exports = Banners;
