import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();

const db = process.env.MONGO_URI
const connectDB = async () => {
  console.log('MongoDB: Connecting...');
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
