import { CourseModel, ICourse } from '../models/Course.model';
import { EnrollmentModel, IEnrollment } from '../models/Enrollment.model';
import { UserModel } from '../models/User.model';
import { ApiError } from '../utils/ApiError';
import { UserRole } from '../types/user.types';

export class CourseService {
    public static async createCourse(courseData: Partial<ICourse>, facultyId: string): Promise<ICourse> {
        const instructor = await UserModel.findById(facultyId);
        if (!instructor || instructor.role !== 'FACULTY') {
            throw new ApiError('Only faculty members can be assigned as instructors.', 403);
        }

        const newCourse = await CourseModel.create({
            ...courseData,
            instructor: facultyId,
        });

        return newCourse.populate({ path: 'instructor', select: 'firstName lastName email' });
    }
    
    public static async findAllCourses(filters: { department?: string, search?: string, page?: number, limit?: number }): Promise<ICourse[]> {
        // Basic filtering example
        const query: any = { isActive: true };
        if (filters.department) {
            query.department = filters.department;
        }
        return CourseModel.find(query).populate({ path: 'instructor', select: 'firstName lastName email' });
    }

    public static async findCourseById(courseId: string): Promise<ICourse> {
        const course = await CourseModel.findById(courseId).populate({ path: 'instructor', select: 'firstName lastName email' });
        if (!course) {
            throw new ApiError('Course not found.', 404);
        }
        return course;
    }

    public static async enrollInCourse(courseId: string, studentId: string): Promise<IEnrollment> {
        const course = await CourseModel.findById(courseId);
        if (!course || !course.isActive) {
            throw new ApiError('Course not found or is currently inactive.', 404);
        }
        
        const currentEnrollments = await EnrollmentModel.countDocuments({ course: courseId, status: 'ENROLLED' });

        if (currentEnrollments >= course.maxCapacity) {
            throw new ApiError('This course has reached its maximum capacity.', 409);
        }

        const existingEnrollment = await EnrollmentModel.findOne({ student: studentId, course: courseId });
        if (existingEnrollment && existingEnrollment.status === 'ENROLLED') {
            throw new ApiError('You are already enrolled in this course.', 409);
        }

        const enrollment = await EnrollmentModel.create({
            student: studentId,
            course: courseId,
            status: 'ENROLLED',
        });

        return enrollment.populate(['student', 'course']);
    }

    public static async getCourseRoster(courseId: string, requestingUserId: string, requestingUserRole: UserRole): Promise<IEnrollment[]> {
        const course = await CourseModel.findById(courseId);
        if (!course) {
            throw new ApiError('Course not found.', 404);
        }

        const isInstructor = course.instructor.toString() === requestingUserId;
        const isAdmin = requestingUserRole === 'ADMIN';

        if (!isInstructor && !isAdmin) {
            throw new ApiError('You are not authorized to view this course roster.', 403);
        }

        return EnrollmentModel.find({ course: courseId, status: 'ENROLLED' })
                            .populate({ path: 'student', select: 'firstName lastName email studentSpecifics.studentId' });
    }
    
    public static async updateStudentGrade(enrollmentId: string, grade: string, facultyId: string): Promise<IEnrollment> {
        const enrollment = await EnrollmentModel.findById(enrollmentId).populate('course');
        if (!enrollment) {
            throw new ApiError('Enrollment record not found.', 404);
        }
        
        const course = enrollment.course as unknown as ICourse;
        if (course.instructor.toString() !== facultyId) {
            throw new ApiError('You are not the instructor for this course.', 403);
        }

        const validGrades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F', 'W', 'P'];
        if (!validGrades.includes(grade.toUpperCase())) {
             throw new ApiError('Invalid grade provided.', 400);
        }

        enrollment.grade = grade.toUpperCase();
        enrollment.status = 'COMPLETED';
        await enrollment.save();

        return enrollment;
    }
}