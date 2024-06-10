const mongoose = require("mongoose");

const DailySchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const diaryDB = mongoose.connection.useDb("diary");
module.exports = diaryDB.model("dailydatas", DailySchema);
