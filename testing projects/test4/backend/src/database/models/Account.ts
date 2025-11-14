import { Schema, model, Document, Types } from 'mongoose';

export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'INVESTMENT';

export interface IAccount extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    name: string;
    type: AccountType;
    currency: string;
    initialBalance: number;
    currentBalance: number;
    isActive: boolean;
    createdAt: Date;
}

const AccountSchema = new Schema<IAccount>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    type: { 
        type: String, 
        enum: ['CHECKING', 'SAVINGS', 'CREDIT_CARD', 'INVESTMENT'], 
        required: true 
    },
    currency: { type: String, required: true, default: 'USD' },
    initialBalance: { type: Number, required: true, min: 0, default: 0 },
    currentBalance: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

AccountSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Account = model<IAccount>('Account', AccountSchema);