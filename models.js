const mongoose = require('mongoose');

// Define patient schema
const patientSchema = new mongoose.Schema({
  patientID: {
    type: String,
    required: true // Indicates this field is required
  },
  surname: String,
  otherNames: String,
  gender: String,
  phoneNumber: String,
  residentialAddress: String,
  emergencyContact: {
    name: String,
    contact: String,
    relationship: String
  }
});

// Create Patient model using the patient schema
const Patient = mongoose.model('Patient', patientSchema);

// Define encounter schema
const encounterSchema = new mongoose.Schema({
  patientID: {
    type: String,
    required: true // Indicates this field is required
  },
  dateAndTime: {
    type: Date,
    default: Date.now // Set default value to current date/time
  },
  encounterType: {
    type: String,
    enum: ['emergency', 'opd', 'specialist care'] // Define allowed values
  }
});

// Create Encounter model using the encounter schema
const Encounter = mongoose.model('Encounter', encounterSchema);

// Export Patient and Encounter models
module.exports = { Patient, Encounter };
