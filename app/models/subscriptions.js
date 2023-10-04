const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    authType: {
      type: Number,
      required: true
    },
    planPeriod: {
      type: Number,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Subscription = mongoose.model("subscriptions", schema);
module.exports = Subscription;
