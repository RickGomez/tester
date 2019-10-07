
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  imagePath: String,
  userId: String,
});

module.exports = mongoose.model('Images', ImageSchema);
