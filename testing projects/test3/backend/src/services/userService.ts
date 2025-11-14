import { UserModel } from '../models/User.model';
import { IUser } from '../types/user.types';
import { ApiError } from '../utils/ApiError';

export class UserService {
    public static async fetchUserProfile(userId: string): Promise<IUser> {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new ApiError('User not found.', 404);
        }
        return user;
    }

    public static async updateUserProfile(userId: string, updateData: Partial<IUser>): Promise<IUser> {
        // Prevent sensitive fields from being updated via this endpoint
        const forbiddenFields = ['passwordHash', 'role', 'isActive', 'email'];
        for (const field of forbiddenFields) {
            if (updateData[field as keyof IUser]) {
                delete updateData[field as keyof IUser];
            }
        }
        
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true });
        
        if (!updatedUser) {
            throw new ApiError('User not found.', 404);
        }
        return updatedUser;
    }
}