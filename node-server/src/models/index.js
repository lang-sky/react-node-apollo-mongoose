import 'dotenv/config';
import mongoose from 'mongoose';

import User from './user';
import Message from './message';

const connectDb = () => {
  if (process.env.DATABASE_URL) {
    return mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
};

const models = { User, Message };

export { connectDb };
export default models;
