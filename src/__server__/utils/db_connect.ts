import mongoose from 'mongoose';
import { DB_NAME } from './constants';

interface conectionInterface {
  isConnected?: Number
}

const connection: conectionInterface = {}

const connectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log('Mongodb already connected');
      return;
    } else {
      const dbConnectionInstance = await mongoose.connect(
        `${process.env.MONGODB_URI}/${DB_NAME}`
      );
      connection.isConnected = dbConnectionInstance.connections[0].readyState;
      console.log(
        `\n MongoDB Connected !! DB HOST: ${dbConnectionInstance.connection.host}`
      );
    }

  } catch (e) {
    console.log('DB Connection Error', e);
    process.exit(1);
  }
};

export default connectDB;
