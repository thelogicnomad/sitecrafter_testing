import { z } from 'zod';
import mongoose from 'mongoose';

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const MongoIdParamSchema = z.object({
  params: z.object({
    id: z.string().refine(isValidObjectId, { message: "Invalid ObjectId" }),
  }),
});

// Auth Schemas
export const RegisterSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
  })
});

export const LoginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string()
    })
});

export const RefreshTokenSchema = z.object({
    body: z.object({
        refreshToken: z.string()
    })
});

// User Schemas
export const UpdateUserSchema = z.object({
    body: z.object({
        firstName: z.string().trim().min(1).optional(),
        lastName: z.string().trim().min(1).optional(),
    })
});

// Account Schemas
export const AccountCreateSchema = z.object({
    body: z.object({
        name: z.string().trim().min(2, "Account name is too short."),
        type: z.enum(['CHECKING', 'SAVINGS', 'CREDIT_CARD', 'INVESTMENT']),
        initialBalance: z.number().min(0, "Initial balance cannot be negative."),
        currency: z.string().optional().default('USD'),
    })
});

export const UpdateAccountSchema = MongoIdParamSchema.extend({
    body: z.object({
        name: z.string().trim().min(2).optional(),
        type: z.enum(['CHECKING', 'SAVINGS', 'CREDIT_CARD', 'INVESTMENT']).optional(),
    })
});


// Transaction Schemas
export const TransactionCreateSchema = z.object({
    body: z.object({
        accountId: z.string().refine(isValidObjectId, { message: "Invalid Account ID" }),
        amount: z.number().positive("Amount must be positive."),
        type: z.enum(['INCOME', 'EXPENSE']),
        categoryId: z.string().refine(isValidObjectId, { message: "Invalid Category ID" }),
        description: z.string().trim().max(255).optional(),
        date: z.string().datetime().optional(),
        isRecurring: z.boolean().optional().default(false),
    })
});

export const UpdateTransactionSchema = MongoIdParamSchema.extend({
    body: z.object({
        accountId: z.string().refine(isValidObjectId).optional(),
        amount: z.number().positive().optional(),
        type: z.enum(['INCOME', 'EXPENSE']).optional(),
        categoryId: z.string().refine(isValidObjectId).optional(),
        description: z.string().trim().max(255).optional(),
        date: z.string().datetime().optional(),
        isRecurring: z.boolean().optional(),
    })
});


export const TransactionGetSchema = z.object({
  query: z.object({
    page: z.string().optional().default('1').transform(Number).refine(n => n >= 1),
    limit: z.string().optional().default('20').transform(Number).refine(n => n >= 1 && n <= 100),
    accountId: z.string().refine(isValidObjectId).optional(),
    categoryId: z.string().refine(isValidObjectId).optional(),
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  })
});