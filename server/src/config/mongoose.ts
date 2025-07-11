import mongoose from 'mongoose';
import Income from '../models/Income'

const MONGO_URI = process.env.MONGO_URI!;

export async function connectToDatabase() {

  try {

    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB ${MONGO_URI}`);
    setUp();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Uncomment once this works
  }
};

async function setUp(){
  const incomeExists = await Income.findOne();
  if (!incomeExists) {
    await Income.create({ amount: 0 });
    console.log('Initialized income document with amount: 0');
  }
}