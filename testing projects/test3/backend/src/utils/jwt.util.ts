import jwt, { JwtPayload } from 'jsonwebtoken';
    import { UserRole } from '../types/user.types';
    import { config } from '../config';
    import { Types } from 'mongoose';
    
    const ACCESS_EXPIRY = '15m';
    const REFRESH_EXPIRY = '7d';
    
    export interface AccessTokenPayload extends JwtPayload {
        userId: string;
        role: UserRole;
    }
    
    export const generateTokens = (userId: string, role: UserRole) => {
        const accessToken = jwt.sign(
            { userId, role },
            config.JWT_ACCESS_SECRET,
            { expiresIn: ACCESS_EXPIRY }
        );
    
        const jti = new Types.ObjectId().toHexString(); 
        const refreshToken = jwt.sign(
            { userId, jti },
            config.JWT_REFRESH_SECRET,
            { expiresIn: REFRESH_EXPIRY }
        );
    
        return { accessToken, refreshToken };
    };
    
    export const verifyToken = (token: string, secret: string): JwtPayload | string | null => {
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return null;
        }
    };