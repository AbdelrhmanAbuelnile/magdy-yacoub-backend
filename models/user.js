
/**

user.js
This file defines the user model for the API application using Mongoose.
*/

// Import required modules
const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

// Define user schema
const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    age: Number,
    sex: String,
    height: Number,
    weight: Number,
    geneticDiabetes: Boolean,
    geneticHeartDiseases: Boolean,
    smoker: Boolean,
});

// Export the user model
module.exports = mongoose.model('User', userSchema);