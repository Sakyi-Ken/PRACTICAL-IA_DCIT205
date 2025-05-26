const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const morgan = require('morgan');

const patientsRouter = require('./src/routes/patients.route');
// const encountersRouter = require('./src/routes/encounters.route');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(bodyParser.json());

app.use(morgan('dev')); // Logging middleware

app.use('/api/v1', patientsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is humming on port ${PORT}`);
});
