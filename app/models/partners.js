const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Partners = mongoose.model("partners", schema);
module.exports = Partners;
