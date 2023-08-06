import express from 'express';
import connectDB from './config/mongodb.js';
import path from 'path';
import patientsRoute from './api/patient/patientRoute.js';
import medicinalsRoute from './api/medicinal/medicinalRoute.js';
import treatmentsRoute from './api/treatment/treatmentRoute.js';
import contractsRoute from './api/contract/contractRoute.js';

// Init
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/patients', patientsRoute);
app.use('/api/contracts', contractsRoute);
app.use('/api/treatments', treatmentsRoute);
app.use('/api/medicinals', medicinalsRoute);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
