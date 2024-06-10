const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username : {
    type : String,
    require : true,
    unique : true,
  },
  password : {
    type : String,
    require : true,
  },
})

const diaryDB = mongoose.connection.useDb("diary");
module.exports = diaryDB.model("User", UserSchema);