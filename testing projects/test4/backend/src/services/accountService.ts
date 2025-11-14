import { Account, IAccount } from '../database/models/Account';
import { Transaction } from '../database/models/Transaction';
import { AppError } from '../core/errors/AppError';
import { AccountCreateRequest } from '../types';
import mongoose, { Types } from 'mongoose';

export class AccountService {
    public async createAccount(userId: string, data: AccountCreateRequest['body']): Promise<IAccount> {
        const { name, type, initialBalance, currency } = data;
        const newAccount = new Account({
            userId,
            name,
            type,
            initialBalance,
            currentBalance: initialBalance,
            currency,
        });
        await newAccount.save();
        return newAccount;
    }

    public async getUserAccounts(userId: string): Promise<IAccount[]> {
        return Account.find({ userId });
    }

    public async getAccountById(userId: string, accountId: string): Promise<IAccount> {
        const account = await Account.findOne({ _id: accountId, userId });
        if (!account) {
            throw new AppError('Account not found or access denied.', 404);
        }
        return account;
    }
    
    public async updateAccount(userId: string, accountId: string, data: Partial<IAccount>): Promise<IAccount> {
        const account = await Account.findOneAndUpdate(
            { _id: accountId, userId },
            { $set: data },
            { new: true, runValidators: true }
        );
        if (!account) {
            throw new AppError('Account not found or access denied.', 404);
        }
        return account;
    }

    public async deleteAccount(userId: string, accountId: string): Promise<void> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const account = await Account.findOneAndDelete({ _id: accountId, userId }, { session });
            if (!account) {
                throw new AppError('Account not found or access denied.', 404);
            }
            await Transaction.deleteMany({ accountId }, { session });
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    public async recalculateAccountBalance(accountId: Types.ObjectId | string, session?: mongoose.ClientSession): Promise<void> {
        const account = await Account.findById(accountId).session(session || null);
        if (!account) {
            throw new AppError('Account not found during balance update.', 404);
        }

        const result = await Transaction.aggregate([
            { $match: { accountId: new Types.ObjectId(accountId) } },
            { $group: {
                _id: '$accountId',
                total: { $sum: { $cond: [{ $eq: ['$type', 'EXPENSE'] }, { $multiply: ['$amount', -1] }, '$amount'] } }
            }}
        ]).session(session || null);

        const transactionTotal = result.length > 0 ? result[0].total : 0;
        const newBalance = account.initialBalance + transactionTotal;

        await Account.updateOne(
            { _id: accountId },
            { $set: { currentBalance: newBalance } },
            { session: session || null }
        );
    }
}