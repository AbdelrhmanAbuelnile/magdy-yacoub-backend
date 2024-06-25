/**

diagnose.js
This file defines the diagnose model for the API application using Mongoose.
*/

// Import required modules
const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

// Define log schema
const diagnoseSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    diagnose: {
        type: String,
        default: 'Not diagnosed yet',
    }

},{ timestamps: true });


// Export the log model
module.exports = mongoose.model('Diagnose', diagnoseSchema);