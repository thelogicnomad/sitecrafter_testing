import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';
import { config } from '../../config';
import { ZodError } from 'zod';

const sendErrorDev = (err: AppError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err: AppError, res: Response) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    console.error('ERROR 💥 (Non-Operational)', err); 
    res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
    });
};

const handleCastErrorDB = (err: any) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err: any) => {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleZodError = (err: ZodError) => {
    const errors = err.errors.map(e => `${e.path.join('.')}: ${e.message}`);
    const message = `Invalid input data: ${errors.join('; ')}`;
    return new AppError(message, 400);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    if (!(err instanceof AppError)) {
        if (err.name === 'CastError') error = handleCastErrorDB(err);
        else if (err.code === 11000) error = handleDuplicateFieldsDB(err);
        else if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
        else if (err instanceof ZodError) error = handleZodError(err);
        else {
             error = new AppError(err.message || 'An unexpected error occurred', 500);
        }
    }

    if (config.nodeEnv === 'development') {
        sendErrorDev(error, res);
    } else {
        sendErrorProd(error, res);
    }
};