const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    sportId: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    pdf: {
      type: String,
      required: true
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Notifications = mongoose.model("updates", schema);
module.exports = Notifications;
