const Patient = require('../models/patients.model');
const Encounter = require('../models/encouter.model');
const { ObjectId } = require('mongodb');

exports.createPatient = async (req, res) => {
  try {
    const { surname, otherNames, gender, phoneNumber, residentialAddress } = req.body;
    if (!surname || !otherNames || !gender || !phoneNumber || !residentialAddress) {
      return res.status(400).json({ message: 'All fields are required' });
    } 
    const patient = await Patient.findOne({ phoneNumber });
    if (patient) {
      return res.status(400).json({ message: 'Patient with this phone number already exists' });
    }

    let emergency;
    try {
      emergency = JSON.parse(req.body.emergency);
    }
    catch (error) {
      console.log('Emergency format:', emergency)
      return res.status(400).json({ message: 'Invalid emergency format' });
    }
    if (!emergency) {
      return res.status(400).json({ message: 'Emergency name and contact are required' });
    }
    
    const newPatient = await Patient.create({
      surname,
      otherNames,
      gender,
      phoneNumber,
      residentialAddress,
      emergency
    });
    res.status(201).json({ message: 'Patient created successfully', newPatient });
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    if (!patients || patients.length === 0 ) {
      return res.status(404).json({ message: 'No patients found' });
    }
    res.status(200).json({
      message: 'Patients fetched successfully',
      patients
    })
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({
      message: 'Patient fetched successfully',
      patient
    });
  } catch (error) {
    console.error('Error fetching patient by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.startEncounter = async (req, res) => {
  try {
    const patientId = req.params.id;
    const { encounterType, encounterDate, encounterTime } = req.body;
    if (!encounterType || !encounterDate || !encounterTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const encounter = new Encounter({
      patientId: patient._id,
      encounterType,
      encounterDate,
      encounterTime,
    });
    await encounter.save();

    res.status(201).json({
      message: 'Encounter started successfully',
      encounter
    });
  } catch (error) {
    console.error('Error starting encounter:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.submitVitals = async (req, res) => {
  try {
    const patientId = req.params.id;
    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }
    const { temperature, bloodPressure, pulse, SPO2 } = req.body;
    if (!temperature || !bloodPressure || !pulse || !SPO2) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    patient.patientVitals = {
      temperature,
      bloodPressure,
      pulse,
      SPO2
    };
    await patient.save();

    res.status(200).json({
      message: 'Vitals submitted successfully',
      patient
    });
  } catch (error) {
    console.error('Error submitting vitals:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}