const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Patient = require('../models/Patient');

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

module.exports = router;
