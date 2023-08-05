import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    birth: {
      type: Number,
      required: true,
    },
    stage: {
      type: Number,
      required: true,
    },
    contracts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Patient', patientSchema);
