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
    treatments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treatment',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Patient', patientSchema);
