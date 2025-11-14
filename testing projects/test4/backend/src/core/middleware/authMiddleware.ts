import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';
import { User } from '../../database/models/User';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
            };
        }
    }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new AppError('Authorization token missing or invalid format.', 401));
        }

        const token = authHeader.split(' ')[1];
        const payload = verifyAccessToken(token);

        if (!payload) {
            return next(new AppError('Invalid or expired access token.', 401));
        }

        const user = await User.findById(payload.userId).select('_id');
        if (!user) {
            return next(new AppError('User associated with this token no longer exists.', 401));
        }
        
        req.user = { id: payload.userId };
        
        next();
    } catch (error) {
        next(error);
    }
};