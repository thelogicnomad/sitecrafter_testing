import { Request, Response, NextFunction } from 'express';
    import { ApiError } from '../utils/ApiError';
    import { UserService } from '../services/user.service';
    import { ApiResponse } from '../types/api.types';
    
    export class UserController {
        public static async getMyProfile(req: Request, res: Response, next: NextFunction) {
            try {
                if (!req.user) throw new ApiError('Authentication failed.', 401);
                
                const profile = await UserService.fetchUserProfile(req.user.userId);
                res.status(200).json({ success: true, data: profile } as ApiResponse<any>);
    
            } catch (error) {
                next(error);
            }
        }
        
        public static async updateMyProfile(req: Request, res: Response, next: NextFunction) {
            try {
                if (!req.user) throw new ApiError('Authentication failed.', 401);
                
                const updatedProfile = await UserService.updateUserProfile(req.user.userId, req.user.role, req.body);
                res.status(200).json({ success: true, data: updatedProfile } as ApiResponse<any>);
    
            } catch (error) {
                next(error);
            }
        }
    }