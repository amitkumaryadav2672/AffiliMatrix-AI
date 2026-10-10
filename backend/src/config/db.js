import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-affiliate-saas';
  try {
    // Attempt local or remote MongoDB connection with short timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    console.log('📦 [Database] Connected successfully to MongoDB:', uri);
    return true;
  } catch (err) {
    console.warn('⚠️ [Database] MongoDB connection not available. Operating with zero-friction in-memory store.');
    return false;
  }
}
