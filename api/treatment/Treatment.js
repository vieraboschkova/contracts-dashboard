import mongoose from 'mongoose';

const treatmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
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
    medicinal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicinal',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Treatment', treatmentSchema);
