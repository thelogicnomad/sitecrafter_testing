import dotenv from 'dotenv';
    dotenv.config();
    
    export const config = {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: parseInt(process.env.PORT || '5000', 10),
        FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
        MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/college_platform',
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'SUPER_SECRET_ACCESS_KEY',
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'SUPER_SECRET_REFRESH_KEY_LONG',
    };