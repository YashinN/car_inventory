const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defines mongo db schema for car records.
const carsSchema = new Schema({
  model: {
    type: Number,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  registration: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Car", carsSchema);
