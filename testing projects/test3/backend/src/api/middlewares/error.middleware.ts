import { Request, Response, NextFunction } from 'express';
    import { ApiError } from '../../utils/ApiError';
    import { ErrorResponse } from '../../types/api.types';
    import { config } from '../../config';
    
    export const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
        let statusCode = 500;
        let message = 'An unexpected error occurred';
        let details: any = null;
    
        if (err instanceof ApiError) {
            statusCode = err.statusCode;
            message = err.message;
            details = err.details;
        } else if (err.name === 'ValidationError') {
            statusCode = 400;
            message = 'Validation Failed';
            details = Object.values((err as any).errors).map((e: any) => e.message);
        } else if (err.name === 'MongoServerError' && (err as any).code === 11000) {
            statusCode = 409;
            const field = Object.keys((err as any).keyValue)[0];
            message = `Duplicate key error: A record with this ${field} already exists.`;
        } else if (err.name === 'CastError') {
            statusCode = 400;
            message = `Invalid ID format for resource: ${(err as any).value}`;
        }
    
        if (config.NODE_ENV === 'development' || statusCode >= 500) {
            console.error(`[ERROR] ${new Date().toISOString()} | ${statusCode} | ${message}`, err.stack);
        }
    
        const errorResponse: ErrorResponse = {
            success: false,
            message,
            statusCode,
            details: config.NODE_ENV === 'development' ? err.stack : details,
        };
    
        res.status(statusCode).json(errorResponse);
    };