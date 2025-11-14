import { Schema, model, Document, Types } from 'mongoose';

export type CategoryType = 'INCOME' | 'EXPENSE';

export interface ICategory extends Document {
    _id: Types.ObjectId;
    userId?: Types.ObjectId;
    name: string;
    type: CategoryType;
    iconName: string;
    isSystemDefault: boolean;
}

const CategorySchema = new Schema<ICategory>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', sparse: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true },
    iconName: { type: String, required: true, default: 'default' },
    isSystemDefault: { type: Boolean, default: false }
}, { timestamps: true });

CategorySchema.index({ userId: 1, name: 1, type: 1 }, { unique: true, partialFilterExpression: { userId: { $exists: true } } });
CategorySchema.index({ name: 1, type: 1 }, { unique: true, partialFilterExpression: { isSystemDefault: true } });

export const Category = model<ICategory>('Category', CategorySchema);