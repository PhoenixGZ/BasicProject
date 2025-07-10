import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

export async function connectToDatabase() {

  try {

    await mongoose.connect(MONGO_URI);
    console.log(`✅ Connected to MongoDB ${MONGO_URI}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Uncomment once this works
  }
}