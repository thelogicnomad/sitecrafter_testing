import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserProfile(req.user!.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedUser = await userService.updateUserProfile(req.user!.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};