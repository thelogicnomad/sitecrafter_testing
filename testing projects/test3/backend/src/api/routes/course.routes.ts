import { Router } from 'express';
    import { CourseController } from '../../controllers/course.controller';
    import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware';
    
    const router = Router();
    
    // Public routes
    router.get('/', CourseController.listCourses);
    router.get('/:courseId', CourseController.getCourseById);
    
    // Protected routes
    router.post('/', authenticateToken, authorizeRoles(['FACULTY', 'ADMIN']), CourseController.createCourse);
    router.post('/:courseId/enroll', authenticateToken, authorizeRoles(['STUDENT']), CourseController.enroll);
    router.get('/:courseId/roster', authenticateToken, authorizeRoles(['FACULTY', 'ADMIN']), CourseController.getRoster);
    router.patch('/:courseId/grade/:studentId', authenticateToken, authorizeRoles(['FACULTY']), CourseController.updateGrade);
    
    export default router;