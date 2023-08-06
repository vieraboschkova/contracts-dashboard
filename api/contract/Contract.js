import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema(
  {
    start: {
      type: Number,
      required: true,
    },
    treatment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Treatment',
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    OSPercentage: {
      type: Number,
      required: true,
    },
    noOSPercentage: {
      type: Number,
      required: true,
    },
    OSMaxTimeInMonths: {
      type: Number,
      required: true,
    },
    PSFPercentage: {
      type: Number,
      required: true,
    },
    noPSFPercentage: {
      type: Number,
      required: true,
    },
    PSFMaxTimeInMonths: {
      type: Number,
      required: true,
    },
    progressionMonth: {
      type: Number,
    },
    deathMonth: {
      type: Number,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Contract', contractSchema);
