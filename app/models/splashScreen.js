const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const splashScreens = mongoose.model("splashscreen", schema);
module.exports = splashScreens;
