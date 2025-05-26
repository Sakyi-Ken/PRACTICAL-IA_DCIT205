const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const encounterSchema = new Schema({
  patientId: {
    type: ObjectId,
    ref: 'Patient',
    required: true
  },
  encounterDate: {
    type: Date,
    default: Date.now
  },
  encounterTime: {
    type: String,
    required: true,
    trim: true
  },
  encounterType: {
    type: String,
    required: true,
    enum: ['Emergency','OPD','Specialist Care']
  }
})

const Encounter = mongoose.model('Encounter', encounterSchema);
module.exports = Encounter;