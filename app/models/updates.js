const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    sportId: {
      type: String,
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
