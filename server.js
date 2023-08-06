import express from 'express';
import connectDB from './config/mongodb.js';
import path from 'path';
import patientRoute from './api/patient/patientRoute.js';
import medicinalRoute from './api/medicinal/medicinalRoute.js';
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/patients', patientRoute);
// app.use('/api/contracts', require('./api/contracts'));
// app.use('/api/treatments', require('./api/treatments'));
app.use('/api/medicinals', medicinalRoute);

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
