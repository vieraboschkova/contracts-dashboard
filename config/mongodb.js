import mongoose from 'mongoose';
import config from 'config';

const db = config.get('mongoURI');

const connectDB = async () => {
  console.log('MongoDB: Connecting...');
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
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
