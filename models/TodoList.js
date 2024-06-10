const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    isCompleted: Boolean,
    taskTitle: String,
    date : Date,
  },
  { versionKey: false }
);

const diaryDB = mongoose.connection.useDb("diary");
module.exports =  diaryDB.model("todolists", TaskSchema);
