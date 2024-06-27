const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const diagnoseSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        default: null,
    },
    diagnosis: {
        type: String,
        default: 'Not diagnosed yet',
    },
    preseciption: {
        type: String,
        default: 'No prescription yet',
    },
}, { timestamps: true });

module.exports = mongoose.model('Diagnose', diagnoseSchema);