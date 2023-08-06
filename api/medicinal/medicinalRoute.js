import express from 'express';
import { body, validationResult } from 'express-validator';
import Medicinal from './Medicinal.js';

const router = express.Router();

router
  .route('/')
  // @route GET api/medicinals
  // @description Get all Medicinals
  .get(async (req, res) => {
    try {
      const medicinals = await Medicinal.find({});
      res.status(200).json(medicinals);
    } catch (e) {
      res.status(400).send(e);
    }
  })

  // @route POST api/medicinals
  // @description Create a Medicinal
  .post(
    body('name', 'Please enter a name').trim().notEmpty().isString(),
    body('dosage', 'Please enter a dosage').trim().notEmpty().isString(),
    body('units', 'Please enter a valid number of units').notEmpty().isInt(),
    body('priceInCHF', 'Please enter a valid price in CHF').notEmpty().isInt(),

    async (req, res) => {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(418).json({ errors: errors.array() });
      }
      const { name, dosage, units, priceInCHF } = req.body;
      try {
        const medicinal = new Medicinal({
          name,
          dosage, units, priceInCHF
        });
        console.log(medicinal)
        await medicinal.save();
        res.status(200).json({ message: 'Medicinal created', medicinal });
      } catch (e) {
        res.status(400).send(e);
      }
    }
  );

router
  .route('/:id')
  // @route GET api/medicinals/id
  // @description get all medicinals
  .get(async (req, res) => {
    const medicinal = await Medicinal.findById(req.params.id);
    try {
      if (medicinal === undefined) {
        res.status(404).json({
          error: `Cannot find Medicinal with id: ${req.params.id}`,
        });
      }
      res.status(200).json(medicinal);
    } catch (e) {
      res.status(400).send(e);
    }
  });

export default router;
