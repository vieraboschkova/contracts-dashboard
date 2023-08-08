import express from 'express';
import { body, validationResult } from 'express-validator';
import Patient from './Patient.js';

const router = express.Router();

router
  .route('/')
  // @route GET api/patients
  // @description Get all Patients
  .get(async (req, res) => {
    try {
      const patients = await Patient.find({});
      res.status(200).json(patients);
    } catch (e) {
      res.status(400).send(e);
    }
  })

  // @route POST api/patients
  // @description Create a Patient
  .post(
    body('name', 'Please enter a name').trim().notEmpty().isString(),
    body('birth', 'Please enter a valid date of birth').notEmpty().isInt(),
    body('stage', 'Please enter a valid disease stage').notEmpty().isInt(),
    async (req, res) => {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(418).json({ errors: errors.array() });
      }
      const { name, birth, stage } = req.body;
      try {
        const patient = new Patient({
          name,
          birth,
          stage,
        });
        console.log(patient);
        await patient.save();
        res.status(200).json({ message: 'Patient created', patient });
      } catch (e) {
        res.status(400).send(e);
      }
    },
  );

router
  .route('/:id')
  // @route GET api/patients/id
  // @description get all patients
  .get(async (req, res) => {
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
