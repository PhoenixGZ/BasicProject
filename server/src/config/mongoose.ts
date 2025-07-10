import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/mydb'; // Change DB name as needed

export async function connectToDatabase() {

  try {

    // await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB - not really yet though');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    // process.exit(1); // Uncomment once this works
  }
}