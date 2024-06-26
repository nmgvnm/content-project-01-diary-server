const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,  
    },
    isCompleted: {
      type: Boolean,
      default: false  // 기본값으로 false 설정 (완료되지 않은 상태)
    },
    taskTitle: String,
    createdAt: {
      type: Date,
      default: Date.now  // 기본값으로 현재 날짜와 시간 설정
    }
  },
  { versionKey: false }
);

const diaryDB = mongoose.connection.useDb("diary");
module.exports = diaryDB.model("todolists", TaskSchema);
