const mongoose = require("mongoose");
// authType   1=admin , 2= Academy, 3= Player
const schema = mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    mobile: {
      type: Number,
      required: true
    },
    authType: {
      type: Number,
      required: true
    },
    image: {
      type: String
    },
    academyName: {
      type: String
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    pincode: {
      type: String
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

const users = mongoose.model("users", schema);
module.exports = users;
