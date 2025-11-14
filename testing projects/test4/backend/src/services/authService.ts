import { User } from '../database/models/User';
import { generateTokens, verifyRefreshToken } from '../core/utils/jwt';
import { AppError } from '../core/errors/AppError';
import { RegisterRequest } from '../types';
import { config } from '../config';

export class AuthService {
    public async registerUser(data: RegisterRequest): Promise<{ accessToken: string; refreshToken: string; userId: string; }> {
        const { email, password, firstName, lastName } = data;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError('Email already registered.', 409);
        }

        const newUser = new User({
            email,
            passwordHash: password,
            firstName,
            lastName,
        });

        await newUser.save();
        
        const { accessToken, refreshToken } = generateTokens(newUser._id.toHexString());
        
        const refreshTokenExpires = new Date(Date.now() + config.jwt.refreshTokenExpiry * 1000);
        newUser.refreshTokens.push({ token: refreshToken, expires: refreshTokenExpires });
        await newUser.save();

        return { accessToken, refreshToken, userId: newUser._id.toHexString() };
    }

    public async login(email: string, passwordPlain: string): Promise<{ accessToken: string; refreshToken: string; userId: string; }> {
        const user = await User.findOne({ email }).select('+passwordHash');
        if (!user || !(await user.comparePassword(passwordPlain))) {
            throw new AppError('Invalid email or password.', 401);
        }

        const { accessToken, refreshToken } = generateTokens(user._id.toHexString());

        user.refreshTokens = [];
        const refreshTokenExpires = new Date(Date.now() + config.jwt.refreshTokenExpiry * 1000);
        user.refreshTokens.push({ token: refreshToken, expires: refreshTokenExpires });
        user.lastLogin = new Date();
        await user.save();

        return { accessToken, refreshToken, userId: user._id.toHexString() };
    }
    
    public async refreshAccessToken(token: string): Promise<{ accessToken: string }> {
        const payload = verifyRefreshToken(token);
        if (!payload) {
            throw new AppError('Invalid or expired refresh token.', 401);
        }

        const user = await User.findOne({ 
            _id: payload.userId, 
            'refreshTokens.token': token 
        });

        if (!user) {
            throw new AppError('Refresh token is not valid.', 401);
        }

        const { accessToken } = generateTokens(user._id.toHexString());
        return { accessToken };
    }
}