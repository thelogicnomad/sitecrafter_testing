import { UserRole, IStudentData, IFacultyData } from './user.types';

    export interface IAuthRegisterRequest {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: UserRole;
        specifics: IStudentData | IFacultyData;
    }
    
    export interface IAuthLoginRequest {
        email: string;
        password: string;
    }