const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    playerId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: String
    },
    author: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const PlayerAchivements = mongoose.model("playerachivements", schema);
module.exports = PlayerAchivements;
