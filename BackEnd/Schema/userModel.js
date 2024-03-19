const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  bio:{
    type: String
  },
  password: {
    type: String
  },
  repeat_password: {
    type: String,
    required: true
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;