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

// "webTest" 데이터베이스 선택
const diaryDB = mongoose.connection.useDb("diary");

module.exports = TodoList = diaryDB.model("firebase", fileDataSchema);

