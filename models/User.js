const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,  // 이름 필수 조건 아님
  },
  contact: {
    type: String,
    required: false,  // 연락처 필수 조건 아님
  },
  diaryName: {
    type: String,
    required: true,
  },
});

const diaryDB = mongoose.connection.useDb('diary');
module.exports = diaryDB.model('User', UserSchema);
