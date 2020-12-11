const mongoose = require('mongoose');

const {Schema} = mongoose;

const userModel = new Schema(
  {
    _id:  mongoose.Schema.Types.ObjectId,
    fullName:  {
      type: String,
      required: true
    },
    username:  {
      type: String,
      required: true
    },
    email:  {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:  {
      type: String,
      required: true,
      minlength:10
    },
  }
);

module.exports = mongoose.model('User', userModel);