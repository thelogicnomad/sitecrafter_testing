import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { AccessTokenPayload, RefreshTokenPayload } from '../../types';

export const generateTokens = (userId: string) => {
    const accessToken = jwt.sign({ userId }, config.jwt.secret, {
        expiresIn: `${config.jwt.accessTokenExpiry}s`,
    });
    const refreshToken = jwt.sign({ userId }, config.jwt.secret, {
        expiresIn: `${config.jwt.refreshTokenExpiry}s`,
    });
    return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): AccessTokenPayload | null => {
    try {
        return jwt.verify(token, config.jwt.secret) as AccessTokenPayload;
    } catch (error) {
        return null;
    }
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload | null => {
    try {
        return jwt.verify(token, config.jwt.secret) as RefreshTokenPayload;
    } catch (error) {
        return null;
    }
};