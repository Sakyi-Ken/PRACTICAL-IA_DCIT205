const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// MongoDB connection using promises
mongoose.connect('mongodb://localhost/medical_records_db')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Create mongoose schema and model for patients
const patientSchema = new mongoose.Schema({
  patientID: String,
  surname: String,
  otherNames: String,
  gender: String,
  phoneNumber: String,
  residentialAddress: String,
  emergencyContact: {
    name: String,
    contact: String,
    relationship: String,
  },
});

const Patient = mongoose.model('Patient', patientSchema);

app.use(bodyParser.json());

// Endpoint to register a new patient
app.post('/patients', async (req, res) => {
  try {
    const {
      patientID,
      surname,
      otherNames,
      gender,
      phoneNumber,
      residentialAddress,
      emergencyName,
      emergencyContact,
      relationship,
    } = req.body;

    // Create a new patient instance
    const newPatient = new Patient({
      patientID,
      surname,
      otherNames,
      gender,
      phoneNumber,
      residentialAddress,
      emergencyContact: {
        name: emergencyName,
        contact: emergencyContact,
        relationship,
      },
    });

    // Save the patient to the database
    await newPatient.save();

    res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ... (previous code remains unchanged)

// Create mongoose schema and model for patient encounters
const encounterSchema = new mongoose.Schema({
  patientID: String,
  dateAndTime: Date,
  encounterType: String,
});

const Encounter = mongoose.model('Encounter', encounterSchema);

// Endpoint to start an encounter for a patient
app.post('/api/encounters', async (req, res) => {
  try {
    const {
      patientID,
      dateAndTime,
      encounterType,
    } = req.body;

    // Create a new encounter instance
    const newEncounter = new Encounter({
      patientID,
      dateAndTime: new Date(dateAndTime), // Assuming the dateAndTime is provided as a string in a valid format
      encounterType,
    });

    // Save the encounter to the database
    await newEncounter.save();

    res.status(201).json({ message: 'Encounter started successfully', encounter: newEncounter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ... (remaining code remains unchanged)


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
