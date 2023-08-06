import express from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import Contract from './Contract.js';

const router = express.Router();

router
  .route('/')
  // @route GET api/contracts
  // @description Get all Contracts
  .get(async (req, res) => {
    try {
      const contracts = await Contract.find({});
      res.status(200).json(contracts);
    } catch (e) {
      res.status(400).send(e);
    }
  })

  // TODO: fix eslint/prettier

  // @route POST api/contracts
  // @description Create a Contract
  .post(
    body('start', 'Please enter a valid contract start').notEmpty().isInt(),
    body('patient', 'Please enter a valid patient id').notEmpty().isMongoId(),
    body('treatment', 'Please enter a valid treatment id')
      .notEmpty()
      .isMongoId(),
    body('OSPercentage', 'Please enter a valid OS percentage discount')
      .notEmpty()
      .isInt(),
    body('noOSPercentage', 'Please enter a valid no-OS percentage discount')
      .notEmpty()
      .isInt(),
    body('OSMaxTimeInMonths', 'Please enter a valid OS limit in months')
      .notEmpty()
      .isInt(),
    body('PSFPercentage', 'Please enter a valid PSF percentage discount')
      .notEmpty()
      .isInt(),
    body('noPSFPercentage', 'Please enter a valid no-PSF percentage discount')
      .notEmpty()
      .isInt(),
    body('PSFMaxTimeInMonths', 'Please enter a valid PSF limit in months')
      .notEmpty()
      .isInt(),

    async (req, res) => {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(418).json({ errors: errors.array() });
      }
      const {
        start,
        patient,
        treatment,
        OSPercentage,
        noOSPercentage,
        OSMaxTimeInMonths,
        PSFPercentage,
        noPSFPercentage,
        PSFMaxTimeInMonths,
      } = req.body;
      try {
        const contract = new Contract({
          start,
          patient,
          treatment,
          OSPercentage,
          noOSPercentage,
          OSMaxTimeInMonths,
          PSFPercentage,
          noPSFPercentage,
          PSFMaxTimeInMonths,
        });
        console.log(contract);
        await contract.save();
        res.status(200).json({ message: 'Contract created', contract });
      } catch (e) {
        res.status(400).send(e);
      }
    },
  );

router
  .route('/:id')
  // @route GET api/contracts/id
  // @description get all contracts

  .get(async (req, res) => {
    // TODO: fix try / catch blocks
    const contract = await Contract.findById(req.params.id);
    try {
      if (contract === undefined) {
        res.status(404).json({
          error: `Cannot find Contract with id: ${req.params.id}`,
        });
      }
      res.status(200).json(contract);
    } catch (e) {
      res.status(400).send(e);
    }
  })

  .put(
    [
      oneOf([
        body(
          'progressionMonth',
          'Please enter a vliad number of month in which progression happened',
        ).isInt(),
        body(
          'deathMonth',
          'Please enter a valid number of month in which death happened',
        ).isInt(),
      ]),
    ],
    async (req, res) => {
      const { progressionMonth, deathMonth } = req.body;
      try {
        const contract = await Contract.findById(req.params.id);
        if (contract === undefined) {
          res.status(404).json({
            error: `Cannot find contract with id: ${req.params.id}'`,
          });
          return;
        }
        if (progressionMonth) contract.progressionMonth = progressionMonth;
        if (deathMonth) contract.deathMonth = deathMonth;
        await contract.save();
        res
          .status(200)
          .json({ message: 'Contract updated successfully', contract });
      } catch (e) {
        res.status(500).send(e);
      }
    },
  );

export default router;
