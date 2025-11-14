import { Request, Response, NextFunction } from 'express';
    import { AuthService } from '../services/auth.service';
    import { ApiError } from '../utils/ApiError';
    import { ApiResponse, TokenResponse } from '../types/api.types';
    import { IAuthRegisterRequest, IAuthLoginRequest } from '../types/auth.types';
    
    export class AuthController {
        public static async register(req: Request, res: Response, next: NextFunction) {
            try {
                const reqBody = req.body as IAuthRegisterRequest;
                if (!reqBody.email || !reqBody.password || !reqBody.role || !reqBody.firstName || !reqBody.lastName || !reqBody.specifics) {
                    throw new ApiError('Missing required registration fields.', 400);
                }
    
                const tokens = await AuthService.registerUser(reqBody);
                res.status(201).json({ success: true, data: tokens } as ApiResponse<TokenResponse>);
    
            } catch (error) {
                next(error);
            }
        }
        
        public static async login(req: Request, res: Response, next: NextFunction) {
            try {
                const { email, password } = req.body as IAuthLoginRequest;
                if (!email || !password) {
                    throw new ApiError('Email and password are required.', 400);
                }
    
                const tokens = await AuthService.login(email, password);
                res.status(200).json({ success: true, data: tokens } as ApiResponse<TokenResponse>);
    
            } catch (error) {
                next(error);
            }
        }
    }