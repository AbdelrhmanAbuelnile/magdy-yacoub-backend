const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Doctorschema = new mongoose.Schema({
  name: String,
  email: String,
})

const Doctors = mongoose.model('Doctors',Doctorschema);

module.exports = Doctors;