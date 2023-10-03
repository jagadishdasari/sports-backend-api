const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true
    },
    subscriptionId: {
      type: String, //need to replace the type with Object id
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

const Checkout = mongoose.model("checkout", schema);
module.exports = Checkout;
