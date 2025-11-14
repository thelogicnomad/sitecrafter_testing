import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 5001,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI,
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret',
        accessTokenExpiry: parseInt(process.env.ACCESS_TOKEN_EXPIRY_SECONDS || '900', 10),
        refreshTokenExpiry: parseInt(process.env.REFRESH_TOKEN_EXPIRY_SECONDS || '604800', 10),
    },
};