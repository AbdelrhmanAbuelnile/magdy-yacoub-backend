
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
    role: { type: String, enum: ['doctor', 'patient'], required: true }
});



// Export the user model
module.exports = mongoose.model('User', userSchema);