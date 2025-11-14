import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { RegisterRequest, LoginRequest } from '../types';

const authService = new AuthService();

export const register = async (req: Request<{}, {}, RegisterRequest>, res: Response, next: NextFunction) => {
    try {
        const result = await authService.registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request<{}, {}, LoginRequest>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;
        const result = await authService.refreshAccessToken(refreshToken);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};