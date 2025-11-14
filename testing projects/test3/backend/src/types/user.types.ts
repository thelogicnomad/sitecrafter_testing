import { Document, Types } from 'mongoose';

    export type UserRole = 'STUDENT' | 'FACULTY' | 'ADMIN';

    // This interface is for the base user document in Mongoose
    export interface IUser extends Document {
        email: string;
        firstName: string;
        lastName: string;
        passwordHash: string;
        role: UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        studentSpecifics?: IStudentData;
        facultySpecifics?: IFacultyData;
    }

    export interface IStudentData {
        studentId: string;
        major: string;
        enrollmentYear: number;
    }
    
    export interface IFacultyData {
        department: string;
        employeeId: string;
        officeLocation?: string;
    }