const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");
const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log("MongoDB Connection is Successfull ");
    mongoose.connection.on("error", () => {
      console.error("DB connection error !!!", error);
    });
  } catch (error) {
    console.error("DB couldn't connect !!!", error.toString());
  }
};

module.exports = connectDB;
