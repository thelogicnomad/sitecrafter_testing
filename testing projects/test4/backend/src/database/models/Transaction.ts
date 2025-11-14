import { Schema, model, Document, Types } from 'mongoose';

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface ITransaction extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    accountId: Types.ObjectId;
    categoryId: Types.ObjectId;
    amount: number;
    type: TransactionType;
    description: string;
    date: Date;
    isRecurring: boolean;
    createdAt: Date;
    updatedAt: Date;
    signedAmount: number;
}

const TransactionSchema = new Schema<ITransaction>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true, index: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    amount: { type: Number, required: true, min: 0.01 },
    type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true },
    description: { type: String, trim: true, maxlength: 255 },
    date: { type: Date, required: true, default: Date.now },
    isRecurring: { type: Boolean, default: false },
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

TransactionSchema.index({ userId: 1, date: -1 });
TransactionSchema.index({ accountId: 1, date: -1 });

TransactionSchema.virtual('signedAmount').get(function() {
    return this.type === 'EXPENSE' ? -this.amount : this.amount;
});

export const Transaction = model<ITransaction>('Transaction', TransactionSchema);