const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    sport: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Categories = mongoose.model("categories", schema);
module.exports = Categories;
