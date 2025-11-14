import express, { Application } from 'express';
    import cors from 'cors';
    import helmet from 'helmet';
    import apiRoutes from './api/routes';
    import { errorHandler } from './api/middlewares/error.middleware';
    import { ApiError } from './utils/ApiError';
    import { config } from './config';
    
    export const createApp = (): Application => {
        const app = express();
    
        // --- Security & Cross-Origin ---
        app.use(helmet()); // Sets various HTTP headers for security
        app.use(cors({
            origin: config.FRONTEND_URL,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true
        }));
    
        // --- Body Parsing ---
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    
        // --- API Routes ---
        app.use('/api/v1', apiRoutes);
    
        // --- Health Check ---
        app.get('/health', (req, res) => res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() }));
    
        // --- 404 Not Found Handler ---
        app.all('*', (req, res, next) => {
            next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
        });
    
        // --- Global Error Handling (Must be the last middleware) ---
        app.use(errorHandler);
    
        return app;
    };