import mongoose from 'mongoose';

const treatmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    startDate: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    maxStage: {
      type: Number,
      required: true,
    },
    maxAge: {
      type: Number,
      required: true,
    },
    medicinals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicinal',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Treatment', treatmentSchema);
