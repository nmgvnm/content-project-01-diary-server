const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    isCompleted: Boolean,
    taskTitle: String,
    date : Date,
  },
  { versionKey: false }
);

// "webTest" 데이터베이스 선택
const diaryDB = mongoose.connection.useDb("diary");

// "edidatas" 컬렉션 선택
module.exports = TodoList = diaryDB.model("todolists", TaskSchema);
