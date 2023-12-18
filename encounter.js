const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Encounter = require('../models/Encounter');

router.post('/', async (req, res) => {
  try {
    const {
      patientID,
      dateAndTime,
      encounterType,
    } = req.body;

    const newEncounter = new Encounter({
      patientID,
      dateAndTime: new Date(dateAndTime),
      encounterType,
    });

    await newEncounter.save();

    res.status(201).json({ message: 'Encounter started successfully', encounter: newEncounter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
