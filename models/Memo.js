const mongoose = require("mongoose");

const MemoSchema = new mongoose.Schema(
  {
    id: Number,
    text: String,
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// "webTest" 데이터베이스 선택
const diaryDB = mongoose.connection.useDb("diary");

// "edidatas" 컬렉션 선택
module.exports = TodoList = diaryDB.model("memodatas", MemoSchema);
