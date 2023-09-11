const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    subject: {
      type: String
    },
    message: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const ContactUs = mongoose.model("contactus", schema);
module.exports = ContactUs;
