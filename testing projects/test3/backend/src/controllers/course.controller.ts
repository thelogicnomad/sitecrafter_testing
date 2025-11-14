import { Request, Response, NextFunction } from 'express';
    import { CourseService } from '../services/course.service';
    import { ApiError } from '../utils/ApiError';
    import { ApiResponse } from '../types/api.types';
    
    export class CourseController {
        public static async createCourse(req: Request, res: Response, next: NextFunction) {
            try {
                if (!req.user) throw new ApiError('Authentication required.', 401);
                const newCourse = await CourseService.createCourse(req.body, req.user.userId);
                res.status(201).json({ success: true, data: newCourse } as ApiResponse<any>);
            } catch (error) {
                next(error);
            }
        }
    
        public static async listCourses(req: Request, res: Response, next: NextFunction) {
            try {
                const courses = await CourseService.findAllActiveCourses();
                res.status(200).json({ success: true, data: courses } as ApiResponse<any>);
            } catch (error) {
                next(error);
            }
        }

        public static async getCourseById(req: Request, res: Response, next: NextFunction) {
            try {
                const course = await CourseService.findCourseById(req.params.courseId);
                res.status(200).json({ success: true, data: course } as ApiResponse<any>);
            } catch (error) {
                next(error);
            }
        }
    
        public static async enroll(req: Request, res: Response, next: NextFunction) {
            try {
                if (!req.user) throw new ApiError('Authentication required.', 401);
                const enrollment = await CourseService.enrollInCourse(req.params.courseId, req.user.userId);
                res.status(201).json({ success: true, data: enrollment } as ApiResponse<any>);
            } catch (error) {
                next(error);
            }
        }
    
        public static async getRoster(req: Request, res: Response, next: NextFunction) {
            try {
                if (!req.user) throw new ApiError('Authentication required.', 401);
                const roster = await CourseService.getCourseRoster(req.params.courseId, req.user.userId, req.user.role);
                res.status(200).json({ success: true, data: roster } as ApiResponse<any>);
            } catch (error) {
                next(error);
            }
        }
    
        public static async updateGrade(req: Request, res: Response, next: NextFunction) {
            try {
                if (!req.user) throw new ApiError('Authentication required.', 401);
                const { grade } = req.body;
                if (!grade) throw new ApiError('Grade is required.', 400);
                
                const updatedEnrollment = await CourseService.updateStudentGrade(req.params.courseId, req.params.studentId, grade, req.user.userId);
                res.status(200).json({ success: true, data: updatedEnrollment } as ApiResponse<any>);
            } catch (error) {
                next(error);
            }
        }
    }