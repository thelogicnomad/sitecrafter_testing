import mongoose from 'mongoose';
    import { createApp } from './app';
    import { config } from './config';
    
    const app = createApp();
    const PORT = config.PORT;
    
    const startServer = async () => {
        try {
            await mongoose.connect(config.MONGO_URI);
            console.log('Database connected successfully to MongoDB.');
    
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT} in ${config.NODE_ENV} mode.`);
            });
    
        } catch (error) {
            console.error('Server initialization failed:', error);
            // Exit process if DB connection fails
            process.exit(1);
        }
    };
    
    startServer();