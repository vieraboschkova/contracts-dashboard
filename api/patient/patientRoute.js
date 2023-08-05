import express from 'express';
import { check, validationResult } from 'express-validator';
import Patient from './Patient.js';

const router = express.Router();

router
  .route('/')
  // @route GET api/patients
  // @description Get all Patients
  .get(async (req, res) => {
    res.send('patients GET')
    return
    try {
      const patients = await Patient.find({});
      res.status(200).json(patients);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  // @route POST api/Patients
  // @description Create a Patient
  .post(
    // check('title', 'Please enter a title').trim().notEmpty().isString(),
    // check('duration', 'Please enter a duration').notEmpty().isFloat(),
    // check('releaseDate', 'Please enter a release date')
    //   .trim()
    //   .isISO8601()
    //   .toDate(),
    // check('description', 'Please enter a description')
    //   .trim()
    //   .notEmpty()
    //   .isString(),
    // check('poster', 'Poster is required').trim().notEmpty().isString(),
    // check('genre', 'Please enter a genre').trim().notEmpty().isString(),
    async (req, res) => {
        res.send('patients POST')
        return
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title } = req.body;
      try {
        const patient = new Patient({
          title,
        });
        await patient.save();
        res.status(200).json({ message: 'Patient created', patient });
      } catch (e) {
        res.status(400).send(e);
      }
    }
  );

router
  .route('/:id')
  // @route GET api/patients/id
  // @description get all patients
  .get(async (req, res) => {
    res.send('patients GET/:id')
    return
    const patient = await Patient.findById(req.params.id);
    try {
      if (patient === undefined) {
        res.status(404).json({
          error: `Cannot find Patient with id: ${req.params.id}`,
        });
      }
      res.status(200).json(patient);
    } catch (e) {
      res.status(400).send(e);
    }
  });

export default router;
