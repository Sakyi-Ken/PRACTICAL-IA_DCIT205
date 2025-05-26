const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientSchema = new Schema({
   surname: {
    type: String,
    required: true,
    trim: true
  }, 
  otherNames: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); // Validate phone number format
      },
      message: props => `${props.value} is not a valid phone number!`
    },

  },
  residentialAddress: {
    type: String,
    required: true,
    trim: true
  },
  emergency: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    contact: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function(v) {
          return /\d{10}/.test(v); // Validate emergency contact number format
        },
        message: props => `${props.value} is not a valid emergency contact number!`
      }
    },
    relationship: {
      type: String,
      required: true,
      trim: true
    }
  },
  patientVitals: {
    bloodPressure: {
      type: String,
      trim: true
    },
    temperature: {
      type: String,
      trim: true
    },
    pulse: {
      type: String,
      trim: true
    },
    SPO2: {
      type: String,
      trim: true
    }
  }
})
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;