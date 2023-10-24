const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    subscriptionId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    transactionId: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const transactionIds = mongoose.model("transactionids", schema);
module.exports = transactionIds;
