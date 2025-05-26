const router = require('express').Router();
const patientController = require('../controllers/patient.controller');
// const encounterController = require('../controllers/encounter.controller');

// Patient Routes
router.get('/patients', patientController.getAllPatients);
router.get('/patients/:id', patientController.getPatientById);
router.post('/patients', patientController.createPatient);
router.put('/patients/:id', patientController.submitVitals);
router.post('/patients/:id/encounters', patientController.startEncounter);

module.exports = router;