const mongoose = require('mongoose');

const {Schema} = mongoose;

const postModel = new Schema(
  {
    title:  {type: String },
    author:  {type: String },
    genre:  {type: String },
    read:  {type: Boolean, default: false },
  }
);

module.exports = mongoose.model('Post', bookModel);