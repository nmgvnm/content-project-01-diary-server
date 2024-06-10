const mongoose = require("mongoose");

const MemoSchema = new mongoose.Schema(
  {
    text: String,
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const diaryDB = mongoose.connection.useDb("diary");
module.exports = diaryDB.model("memodatas", MemoSchema);
