const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Testimonials = mongoose.model("testimonials", schema);
module.exports = Testimonials;
