/**

diagnose.js
This file defines the diagnose model for the API application using Mongoose.
*/

// Import required modules
const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

// Define log schema
const diagnoseSchema = new Schema({
    patientId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    doctorId:{
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    diagnose: {
        type: String,
        default: 'Not diagnosed yet',
    }

},{ timestamps: true });


// Export the log model
module.exports = mongoose.model('Diagnose', diagnoseSchema);