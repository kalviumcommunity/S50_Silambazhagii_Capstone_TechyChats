// const { string } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  bio:{
    type: String,
  },
  skills:{
    type:String,
  },
  dob:{
    type: Date,
  },
  place:{
    type: String,
  },
  password: {
    type: String,
  },
  repeat_password: {
    type: String
  },

});

const User = mongoose.model("User", userSchema);
module.exports = User;