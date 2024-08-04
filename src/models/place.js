const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  feature: {
    type: String,
    required: false,
  },
  nation: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
});

const place = mongoose.model('place', placeSchema);
module.exports = place;
