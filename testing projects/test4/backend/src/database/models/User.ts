import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    _id: Types.ObjectId;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    lastLogin: Date;
    refreshTokens: {
        token: string;
        expires: Date;
    }[];
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    refreshTokens: [{
        token: { type: String, required: true },
        expires: { type: Date, required: true }
    }]
});

UserSchema.index({ email: 1 });
UserSchema.index({ 'refreshTokens.token': 1 });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) return next();
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.passwordHash);
};

export const User = model<IUser>('User', UserSchema);