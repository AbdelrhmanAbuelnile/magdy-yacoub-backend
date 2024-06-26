const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  bloodType: { type: String, required: true },
  oxygenLevel: { type: Number, required: true },
  heartRate: { type: Number, required: true },
  hand: { type: String, required: true },
  smartWatch: { type: String, required: true },
  gender: { type: String, required: true },
  ID: { type: String },
})

module.exports = mongoose.model('Patient', patientSchema);