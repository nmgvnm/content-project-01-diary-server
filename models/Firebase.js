const mongoose = require("mongoose");

const fileDataSchema = new mongoose.Schema(
  {
    topFolder: String,
    imgName: String,
    createdAt: Date,
    downloadURL: String,
  },
  { versionKey: false }
);

const diaryDB = mongoose.connection.useDb("diary");
module.exports = diaryDB.model("firebase", fileDataSchema);

