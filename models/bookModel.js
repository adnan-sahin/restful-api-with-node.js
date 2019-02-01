const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false },
  }
);

// Books is collection name on Mongodb
module.exports = mongoose.model('Book', bookModel, 'Books');
