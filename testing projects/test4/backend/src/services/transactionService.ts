import { ITransaction, Transaction } from '../database/models/Transaction';
import { Account } from '../database/models/Account';
import { AppError } from '../core/errors/AppError';
import { TransactionCreateRequest } from '../types';
import mongoose, { Types } from 'mongoose';
import { AccountService } from './accountService';

const accountService = new AccountService();

export class TransactionService {
    public async createTransaction(userId: string, txData: TransactionCreateRequest['body']): Promise<ITransaction> {
        const { accountId } = txData;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const account = await Account.findOne({ _id: accountId, userId }).session(session);
            if (!account) {
                throw new AppError('Account not found or access denied.', 403);
            }

            const newTransaction = new Transaction({ ...txData, userId });
            await newTransaction.save({ session });
            
            await accountService.recalculateAccountBalance(new Types.ObjectId(accountId), session);
            
            await session.commitTransaction();
            return newTransaction;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    public async getTransactions(userId: string, filters: any): Promise<{ metadata: any, data: ITransaction[] }> {
        const { page = 1, limit = 20, accountId, type, startDate, endDate, categoryId } = filters;
        
        const query: any = { userId: new Types.ObjectId(userId) };
        if (accountId) query.accountId = new Types.ObjectId(accountId);
        if (categoryId) query.categoryId = new Types.ObjectId(categoryId);
        if (type) query.type = type;
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(new Date(endDate).setHours(23, 59, 59, 999));
        }

        const total = await Transaction.countDocuments(query);
        const transactions = await Transaction.find(query)
            .sort({ date: -1, createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('categoryId', 'name type iconName')
            .populate('accountId', 'name type');

        return {
            metadata: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / limit) },
            data: transactions
        };
    }
    
    public async getTransactionById(userId: string, transactionId: string): Promise<ITransaction> {
        const transaction = await Transaction.findOne({ _id: transactionId, userId });
        if (!transaction) {
            throw new AppError('Transaction not found or access denied', 404);
        }
        return transaction;
    }

    public async updateTransaction(userId: string, transactionId: string, data: Partial<ITransaction>): Promise<ITransaction> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const transaction = await Transaction.findOne({ _id: transactionId, userId }).session(session);
            if (!transaction) {
                throw new AppError('Transaction not found or access denied.', 404);
            }

            const originalAccountId = transaction.accountId;
            Object.assign(transaction, data);
            await transaction.save({ session });

            await accountService.recalculateAccountBalance(originalAccountId, session);
            if (data.accountId && originalAccountId.toString() !== data.accountId.toString()) {
                await accountService.recalculateAccountBalance(transaction.accountId, session);
            }

            await session.commitTransaction();
            return transaction;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
    
    public async deleteTransaction(userId: string, transactionId: string): Promise<void> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const txToDelete = await Transaction.findOneAndDelete({ _id: transactionId, userId }, { session });
            if (!txToDelete) {
                throw new AppError('Transaction not found or access denied.', 404);
            }
            await accountService.recalculateAccountBalance(txToDelete.accountId, session);
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    public async getTransactionSummary(userId: string, filters: any): Promise<any> {
        const { accountId, startDate, endDate } = filters;
        const matchStage: any = { userId: new Types.ObjectId(userId) };
        if (accountId) matchStage.accountId = new Types.ObjectId(accountId);
        if (startDate || endDate) {
            matchStage.date = {};
            if (startDate) matchStage.date.$gte = new Date(startDate);
            if (endDate) matchStage.date.$lte = new Date(new Date(endDate).setHours(23, 59, 59, 999));
        }

        const summary = await Transaction.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: '$type',
                    totalAmount: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            }
        ]);

        const income = summary.find(s => s._id === 'INCOME') || { totalAmount: 0, count: 0 };
        const expense = summary.find(s => s._id === 'EXPENSE') || { totalAmount: 0, count: 0 };

        return {
            income: income.totalAmount,
            expense: expense.totalAmount,
            net: income.totalAmount - expense.totalAmount,
            totalTransactions: income.count + expense.count,
        };
    }
}