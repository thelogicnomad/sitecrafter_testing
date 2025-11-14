import { CourseModel, ICourse } from '../models/Course.model';
    import { EnrollmentModel, IEnrollment } from '../models/Enrollment.model';
    import { UserModel } from '../models/User.model';
    import { ApiError } from '../utils/ApiError';
    import { Types } from 'mongoose';
    import { UserRole } from '../types/user.types';
    
    export class CourseService {
        public static async createCourse(courseData: Partial<ICourse>, instructorId: string): Promise<ICourse> {
            const instructor = await UserModel.findById(instructorId);
            if (!instructor || instructor.role !== 'FACULTY') {
                throw new ApiError('Instructor not found or user is not a faculty member.', 403);
            }
    
            const newCourse = await CourseModel.create({ ...courseData, instructor: instructorId });
            return newCourse.populate({ path: 'instructor', select: 'firstName lastName email' });
        }
    
        public static async findAllActiveCourses(): Promise<ICourse[]> {
            return CourseModel.find({ isActive: true }).populate({ path: 'instructor', select: 'firstName lastName department' }).sort({ courseCode: 1 });
        }

        public static async findCourseById(courseId: string): Promise<ICourse> {
            const course = await CourseModel.findById(courseId).populate({ path: 'instructor', select: 'firstName lastName department' });
             if (!course) {
                throw new ApiError('Course not found.', 404);
            }
            return course;
        }
    
        public static async enrollInCourse(courseId: string, studentId: string): Promise<IEnrollment> {
            const course = await CourseModel.findById(courseId);
            if (!course || !course.isActive) {
                throw new ApiError('Course not found or is no longer active.', 404);
            }
    
            const currentEnrollmentCount = await EnrollmentModel.countDocuments({ course: courseId, status: 'ENROLLED' });
            if (currentEnrollmentCount >= course.maxCapacity) {
                throw new ApiError('Course has reached maximum capacity.', 409);
            }
    
            const existingEnrollment = await EnrollmentModel.findOne({ student: studentId, course: courseId });
            if (existingEnrollment && existingEnrollment.status !== 'DROPPED') {
                throw new ApiError(`You are already ${existingEnrollment.status.toLowerCase()} in this course.`, 409);
            }
    
            const enrollment = await EnrollmentModel.create({ student: studentId, course: courseId, status: 'ENROLLED' });
            return enrollment.populate(['student', 'course']);
        }
    
        public static async getCourseRoster(courseId: string, requestingUserId: string, requestingUserRole: UserRole): Promise<IEnrollment[]> {
            const course = await CourseModel.findById(courseId);
            if (!course) throw new ApiError('Course not found.', 404);
    
            if (requestingUserRole !== 'ADMIN' && course.instructor.toString() !== requestingUserId) {
                throw new ApiError('You are not authorized to view the roster for this course.', 403);
            }
    
            return EnrollmentModel.find({ course: courseId, status: 'ENROLLED' }).populate({
                path: 'student',
                select: 'firstName lastName email studentSpecifics.studentId'
            });
        }
    
        public static async updateStudentGrade(courseId: string, studentId: string, grade: string, facultyId: string): Promise<IEnrollment> {
            const course = await CourseModel.findById(courseId);
            if (!course || course.instructor.toString() !== facultyId) {
                throw new ApiError('You are not the instructor for this course.', 403);
            }
    
            const validGrades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F', 'W'];
            if (!validGrades.includes(grade.toUpperCase())) {
                 throw new ApiError('Invalid grade provided.', 400);
            }
    
            const enrollment = await EnrollmentModel.findOneAndUpdate(
                { student: studentId, course: courseId, status: 'ENROLLED' },
                { $set: { grade: grade.toUpperCase(), status: 'COMPLETED' } },
                { new: true }
            );
    
            if (!enrollment) {
                throw new ApiError('No active enrollment found for this student in this course.', 404);
            }
    
            return enrollment;
        }
    }