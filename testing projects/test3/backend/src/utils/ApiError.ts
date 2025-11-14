export class ApiError extends Error {
        public readonly statusCode: number;
        public readonly isOperational: boolean = true;
        public readonly details?: any;
    
        constructor(message: string, statusCode: number, details?: any) {
            super(message);
            this.statusCode = statusCode;
            this.details = details;
            
            Error.captureStackTrace(this, this.constructor);
        }
    }