const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const patientsRouter = require('./routes/patients');
const encountersRouter = require('./routes/encounters');
const { Patient, Encounter } = require('./models/models');

const app = express();

mongoose.connect('mongodb://localhost/medical_records_db')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(bodyParser.json());

app.use('/patients', patientsRouter);
app.use('/api/encounters', encountersRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
