export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AccessTokenPayload {
    userId: string;
    iat: number;
    exp: number;
}