import mongoose from 'mongoose';

import { config } from '../config/index.js';

if(!process.env.MONGODB_URI)
{
  throw new Error(
    "Please provide MONGODB_URI in the .env file"
  )
}

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connect DB')
  } catch (error) {
    console.log('MongoDB connect error', error.message);
    process.exit(1);
  }
};


