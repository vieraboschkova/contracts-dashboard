import mongoose from 'mongoose';

const medicinalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
      required: true,
    },
    priceInCHF: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Medicinal', medicinalSchema);
