import { Schema, model } from 'mongoose';
    import { IUser } from '../types/user.types';
    
    const StudentSchema = new Schema({
        studentId: { type: String, required: true, unique: true },
        major: { type: String, required: true },
        enrollmentYear: { type: Number, required: true },
    }, { _id: false });
    
    const FacultySchema = new Schema({
        department: { type: String, required: true },
        employeeId: { type: String, required: true, unique: true },
        officeLocation: { type: String },
    }, { _id: false });
    
    const UserSchema = new Schema<IUser>({
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        passwordHash: { type: String, required: true },
        role: { type: String, enum: ['STUDENT', 'FACULTY', 'ADMIN'], required: true },
        isActive: { type: Boolean, default: true },
        studentSpecifics: { type: StudentSchema, required: false },
        facultySpecifics: { type: FacultySchema, required: false }
    }, { timestamps: true });
    
    UserSchema.index({ email: 1 }, { unique: true });
    UserSchema.index({ role: 1 });
    
    UserSchema.pre<IUser>('validate', function(next) {
        if (this.role === 'STUDENT' && !this.studentSpecifics) {
            return next(new Error('Student role requires studentSpecifics.'));
        }
        if (this.role === 'FACULTY' && !this.facultySpecifics) {
            return next(new Error('Faculty role requires facultySpecifics.'));
        }
        next();
    });
    
    export const UserModel = model<IUser>('User', UserSchema);