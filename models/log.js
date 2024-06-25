/**

log.js
This file defines the log model for the API application using Mongoose.
*/

// Import required modules
const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

// Define log schema
const logSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name: String,
    age: Number,
    sex: Number,
    height: Number,
    weight: Number,
    geneticDiabetes: Number,
    geneticHeartDiseases: Number,
    HR: Number,
    HRV: Number,
    systolic_BP: Number,
    diastolic_BP: Number,
    RR: Number,
    SpO2: Number,
    temperature: Number,
    faint: Number,
    sleep: Number,
    smoker: Number,

},{ timestamps: true });


// Export the log model
module.exports = mongoose.model('Log', logSchema);