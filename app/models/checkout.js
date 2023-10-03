const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true
    },
    subscriptionId: {
      type: mongoose.Types.ObjectId
    },
    merchantTransactionId: {
      type: Number,
      required: true
    },
    transactionId: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    },
    subscriptionDate: {
      type: Date,
      required: true
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const splashScreens = mongoose.model("splashscreen", schema);
module.exports = splashScreens;
