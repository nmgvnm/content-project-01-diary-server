const mongoose = require("mongoose");

const MemoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const diaryDB = mongoose.connection.useDb("diary");
module.exports = diaryDB.model("memodatas", MemoSchema);
