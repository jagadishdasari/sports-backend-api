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
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const PlayerVideos = mongoose.model("playervideos", schema);
module.exports = PlayerVideos;
