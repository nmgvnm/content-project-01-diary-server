const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongoose로 mongodb 연결됨");
  } catch (error) {
    console.error("mongoose로 mongodb 연결 실패", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
