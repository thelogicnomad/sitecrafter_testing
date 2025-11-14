import { UserModel } from '../models/User.model';
    import { ApiError } from '../utils/ApiError';
    import { UserRole } from '../types/user.types';
    
    export class UserService {
        public static async fetchUserProfile(userId: string) {
            const user = await UserModel.findById(userId).select('-passwordHash');
            if (!user) {
                throw new ApiError('User not found.', 404);
            }
            return user;
        }
    
        public static async updateUserProfile(userId: string, role: UserRole, updateData: any) {
            const allowedUpdates: { [key in UserRole]: string[] } = {
                STUDENT: ['firstName', 'lastName', 'studentSpecifics.major'],
                FACULTY: ['firstName', 'lastName', 'facultySpecifics.officeLocation'],
                ADMIN: ['firstName', 'lastName']
            };
    
            const updates: any = {};
            for (const key of Object.keys(updateData)) {
                if (allowedUpdates[role].includes(key)) {
                    updates[key] = updateData[key];
                }
            }
    
            if (Object.keys(updates).length === 0) {
                throw new ApiError('No valid fields provided for update.', 400);
            }
    
            const updatedUser = await UserModel.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true }).select('-passwordHash');
    
            if (!updatedUser) {
                throw new ApiError('User not found for update.', 404);
            }
    
            return updatedUser;
        }
    }