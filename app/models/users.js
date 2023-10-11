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

// authType   1=admin , 2= Academy, 3= Player, 4= manager, 5=Employee
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
    academyId: {
      type: mongoose.Types.ObjectId
    },
    managerId: {
      type: mongoose.Types.ObjectId
    },
    academyName: {
      type: String
    },
    image: {
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
    isApproved: {
      type: Boolean,
      default: false
    },
    isSubscribed: {
      type: Boolean,
      default: false
    },
    subscribedDate: {
      type: Date,
      default: null
    },
    subscriptionExpiryDate: {
      type: Date,
      default: null
    },
    profileStatus: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const users = mongoose.model("users", schema);
module.exports = users;
