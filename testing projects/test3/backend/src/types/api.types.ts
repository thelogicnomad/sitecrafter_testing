export interface ApiResponse<T> {
        success: boolean;
        data?: T;
        message?: string;
    }
    
    export interface TokenResponse {
        accessToken: string;
        refreshToken: string;
    }
    
    export interface ErrorResponse {
        success: boolean;
        message: string;
        statusCode: number;
        details?: any;
    }