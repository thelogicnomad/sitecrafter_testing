import { TransactionType } from "../database/models/Transaction";

export interface TransactionCreateRequest {
    accountId: string;
    amount: number;
    type: TransactionType;
    categoryId: string;
    description?: string;
    date?: string;
    isRecurring?: boolean;
}

export interface TransactionUpdateRequest {
    accountId?: string;
    amount?: number;
    type?: TransactionType;
    categoryId?: string;
    description?: string;
    date?: string;
    isRecurring?: boolean;
}