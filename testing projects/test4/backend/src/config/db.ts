import mongoose from 'mongoose';

export const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error('MONGO_URI not defined in environment variables. Exiting.');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB Connected Successfully.');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        process.exit(1);
    }
};