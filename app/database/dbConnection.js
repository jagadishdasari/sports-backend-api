const mongoose = require("mongoose");
const env = require("../config/env")();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(env.MONGODB);
    console.log(`Mongo connected on ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
