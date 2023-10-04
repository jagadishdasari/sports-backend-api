const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    referredIds: [{ type: mongoose.Types.ObjectId }],
    isReferred: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Referrals = mongoose.model("referrals", schema);
module.exports = Referrals;
