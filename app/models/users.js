const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    default: [0, 0]
  }
});

// authType   1=admin , 2= Academy, 3= Player
const schema = mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    mobile: {
      type: Number
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
    location: {
      type: locationSchema,
      index: "2dsphere"
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
