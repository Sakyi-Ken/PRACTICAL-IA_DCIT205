const express = require('express');
const router = express.Router();
const { Encounter } = require('../models/models');

router.post('/submit-info', async (req, res) => {
  try {
    const {
      patientID,
      bloodPressure,
      temperature,
      pulse,
    } = req.body;

    // Assuming the patientID is provided in the request body
    const existingEncounter = await Encounter.findOne({ patientID });

    if (!existingEncounter) {
      return res.status(404).json({ message: 'Encounter not found for the provided patient ID' });
    }

    // Update information in the existing encounter
    existingEncounter.bloodPressure = bloodPressure;
    existingEncounter.temperature = temperature;
    existingEncounter.pulse = pulse;

    await existingEncounter.save();

    res.status(200).json({ message: 'Patient visit information submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
