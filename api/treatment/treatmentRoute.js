import express from 'express';
import { body, validationResult } from 'express-validator';
import Treatment from './Treatment.js';

const router = express.Router();

router
  .route('/')
  // @route GET api/treatments
  // @description Get all Treatments
  .get(async (req, res) => {
    try {
      const treatments = await Treatment.find({});
      res.status(200).json(treatments);
    } catch (e) {
      res.status(400).send(e);
    }
  })

  // @route POST api/treatments
  // @description Create a Treatment
  .post(
    body('name', 'Please enter a name').trim().notEmpty().isString(),
    body('duration', 'Please enter a valid treatment duration')
      .notEmpty()
      .isInt(),
    body('maxStage', 'Please enter a valid maximum patients disease stage')
      .notEmpty()
      .isInt(),
    body('maxAge', 'Please enter a valid maximum age of patient')
      .notEmpty()
      .isInt(),
    body('medicinal', 'Please enter a valid medicinal id')
      .notEmpty()
      .isMongoId(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(418).json({ errors: errors.array() });
      }
      const { name, duration, maxStage, maxAge, medicinal } = req.body;
      try {
        const treatment = new Treatment({
          name,
          duration,
          maxStage,
          maxAge,
          medicinal,
        });
        await treatment.save();
        res.status(200).json({ message: 'Treatment created', treatment });
      } catch (e) {
        res.status(400).send(e);
      }
    },
  );

router
  .route('/:id')
  // @route GET api/treatments/id
  // @description get all treatments
  .get(async (req, res) => {
    const treatment = await Treatment.findById(req.params.id);
    try {
      if (treatment === undefined) {
        res.status(404).json({
          error: `Cannot find Treatment with id: ${req.params.id}`,
        });
      }
      res.status(200).json(treatment);
    } catch (e) {
      res.status(400).send(e);
    }
  });

export default router;
