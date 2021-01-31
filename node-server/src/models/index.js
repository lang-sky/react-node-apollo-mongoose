import 'dotenv/config';
import mongoose from 'mongoose';

import User from './user.model';
import Message from './message.model';

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
