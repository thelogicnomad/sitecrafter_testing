import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './core/errors/errorHandler';
import { AppError } from './core/errors/AppError';
import v1Routes from './routes/v1';

export const createApp = (): Express => {
    const app = express();

    app.use(helmet());
    
    app.use(cors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }));

    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true }));

    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'ok', message: 'Finance Tracker API is healthy' });
    });

    app.use('/api/v1', v1Routes);

    app.all('*', (req, res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });

    app.use(errorHandler);

    return app;
};