import { z } from 'zod';
import { 
    RegisterSchema, 
    LoginSchema, 
    AccountCreateSchema,
    TransactionCreateSchema,
    UpdateUserSchema
} from './validationSchemas';

// Auth
export type RegisterRequest = z.infer<typeof RegisterSchema>['body'];
export type LoginRequest = z.infer<typeof LoginSchema>['body'];

export interface AccessTokenPayload {
    userId: string;
    iat: number;
    exp: number;
}
export interface RefreshTokenPayload extends AccessTokenPayload {};

// User
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;

// Account
export type AccountCreateRequest = z.infer<typeof AccountCreateSchema>;

// Transaction
export type TransactionCreateRequest = z.infer<typeof TransactionCreateSchema>;