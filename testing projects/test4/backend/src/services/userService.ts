import { User, IUser } from '../database/models/User';
import { AppError } from '../core/errors/AppError';
import { UpdateUserRequest } from '../types';

export class UserService {
    public async getUserProfile(userId: string): Promise<Partial<IUser>> {
        const user = await User.findById(userId).select('-passwordHash -refreshTokens');
        if (!user) {
            throw new AppError('User not found.', 404);
        }
        return user;
    }

    public async updateUserProfile(userId: string, data: UpdateUserRequest['body']): Promise<Partial<IUser>> {
        const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true })
            .select('-passwordHash -refreshTokens');
        
        if (!user) {
            throw new AppError('User not found.', 404);
        }
        return user;
    }
}