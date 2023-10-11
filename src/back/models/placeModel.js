const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlaceSchema = new Schema({
  place: { type: String, unique: true },
  html: String,
  createAt: { type: Date, expires: 60 * 60 * 24 * 30 * 3, default: Date.now },
});

let PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;
