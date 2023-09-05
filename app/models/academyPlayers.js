const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    academyId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true
    },
    players: [{ type: mongoose.Types.ObjectId, ref: "users" }]
  },
  {
    timestamps: true
  }
);

const AcademyPlayers = mongoose.model("academyplayers", schema);
module.exports = AcademyPlayers;
