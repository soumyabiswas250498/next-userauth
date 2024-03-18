import mongoose from 'mongoose';
import { DB_NAME } from './constants';

const connectDB = async () => {
  try {
    const dbConnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected !! DB HOST: ${dbConnectionInstance.connection.host}`
    );
  } catch (e) {
    console.log('DB Connection Error', e);
    process.exit(1);
  }
};

export default connectDB;
