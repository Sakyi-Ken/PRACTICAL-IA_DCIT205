// patients.js

const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Route to register a new patient
router.post('/', async (req, res) => {
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

    await newPatient.save();

    res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a list of all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get details of a specific patient by ID
router.get('/:patientId', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
