import { Router } from 'express';
import { getMe, updateMe } from '../../controllers/userController';
import { authenticateToken } from '../../core/middleware/authMiddleware';
import { validateRequest } from '../../core/middleware/validationMiddleware';
import { UpdateUserSchema } from '../../types/validationSchemas';

const router = Router();

router.use(authenticateToken);

router.get('/me', getMe);
router.put('/me', validateRequest(UpdateUserSchema), updateMe);

export default router;