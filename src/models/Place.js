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
  type: {
    type: String,
    required: false,
  },
  nation: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  coordinates: {
    latitude: {
      type: Number,
      required: false
    },
    longitude: {
      type: Number,
      required: false
    }
  },
  rate: {
    type: Number,
    required: false
  },
  rate_count : {
    type: Number,
    required: false
  },
  types : {
    type: [String],
    required: false,
  },
  place_id: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const place = mongoose.model('place', placeSchema);
module.exports = place;
