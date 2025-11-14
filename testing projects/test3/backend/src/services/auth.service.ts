import { UserModel } from '../models/User.model';
    import { ApiError } from '../utils/ApiError';
    import { generateTokens } from '../utils/jwt.util';
    import { IAuthRegisterRequest } from '../types/auth.types';
    import { UserRole } from '../types/user.types';
    import bcrypt from 'bcryptjs';
    
    const SALT_ROUNDS = 12;
    
    export class AuthService {
        public static async registerUser(userData: IAuthRegisterRequest) {
            const { email, password, role, firstName, lastName, specifics } = userData;
    
            if (await UserModel.findOne({ email: email.toLowerCase() })) {
                throw new ApiError('An account with this email already exists.', 409);
            }
    
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
            let newUserPayload: any = {
                email: email.toLowerCase(),
                passwordHash: hashedPassword,
                role,
                firstName,
                lastName
            };
    
            if (role === 'STUDENT') {
                newUserPayload.studentSpecifics = specifics;
            } else if (role === 'FACULTY') {
                newUserPayload.facultySpecifics = specifics;
            } else if (role === 'ADMIN') {
                 // No specifics for admin
            } else {
                throw new ApiError(`Invalid role specified: ${role}`, 400);
            }
    
            const newUser = await UserModel.create(newUserPayload);
            const { accessToken, refreshToken } = generateTokens(newUser._id.toString(), newUser.role as UserRole);
    
            return { accessToken, refreshToken };
        }
    
        public static async login(email: string, passwordAttempt: string) {
            const user = await UserModel.findOne({ email: email.toLowerCase() });
    
            if (!user) {
                throw new ApiError('Invalid email or password.', 401);
            }
    
            if (!user.isActive) {
                 throw new ApiError('This account has been deactivated. Please contact administration.', 403);
            }
    
            const isMatch = await bcrypt.compare(passwordAttempt, user.passwordHash);
    
            if (!isMatch) {
                throw new ApiError('Invalid email or password.', 401);
            }
    
            const { accessToken, refreshToken } = generateTokens(user._id.toString(), user.role as UserRole);
            return { accessToken, refreshToken };
        }
    }