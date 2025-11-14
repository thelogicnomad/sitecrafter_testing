import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        await connectDB();
        const app = createApp();

        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    } catch (err) {
        console.error('Server failed to start:', err);
        process.exit(1);
    }
};

startServer();