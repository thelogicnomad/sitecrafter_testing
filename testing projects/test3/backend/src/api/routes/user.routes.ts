import { Router } from 'express';
    import { UserController } from '../../controllers/user.controller';
    import { authenticateToken } from '../middlewares/auth.middleware';
    
    const router = Router();
    
    router.get('/me', authenticateToken, UserController.getMyProfile);
    router.put('/me', authenticateToken, UserController.updateMyProfile);
    
    export default router;