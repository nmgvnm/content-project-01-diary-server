const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    diaryName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { versionKey: false }
);

const diaryDB = mongoose.connection.useDb("diary");
module.exports = diaryDB.model("User", UserSchema);
