import { Request, Response, NextFunction } from 'express';
    import { verifyToken, AccessTokenPayload } from '../../utils/jwt.util';
    import { UserModel } from '../../models/User.model';
    import { ApiError } from '../../utils/ApiError';
    import { UserRole } from '../../types/user.types';
    import { config } from '../../config';
    
    export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ') && authHeader.split(' ')[1];
    
        if (!token) {
            return next(new ApiError('Authentication token missing.', 401));
        }
    
        const payload = verifyToken(token, config.JWT_ACCESS_SECRET) as AccessTokenPayload | null;
    
        if (!payload || !payload.userId) {
            return next(new ApiError('Invalid or expired token.', 401));
        }
    
        try {
            const user = await UserModel.findById(payload.userId);
    
            if (!user || !user.isActive) {
                return next(new ApiError('User not found or account deactivated.', 401));
            }
            
            req.user = {
                userId: user._id.toString(),
                role: user.role as UserRole
            };
    
            next();
        } catch (error) {
            next(new ApiError('Token verification failed during database lookup.', 500));
        }
    };
    
    export const authorizeRoles = (allowedRoles: UserRole[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            if (!req.user) {
                return next(new ApiError('Authentication required.', 401));
            }
            if (!allowedRoles.includes(req.user.role)) {
                return next(new ApiError(`Access denied. You do not have permission to perform this action.`, 403));
            }
            next();
        };
    };