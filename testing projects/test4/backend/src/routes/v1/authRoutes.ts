import { Router } from 'express';
import { register, login, refresh } from '../../controllers/authController';
import { validateRequest } from '../../core/middleware/validationMiddleware';
import { RegisterSchema, LoginSchema, RefreshTokenSchema } from '../../types/validationSchemas';

const router = Router();

router.post('/register', validateRequest(RegisterSchema), register);
router.post('/login', validateRequest(LoginSchema), login);
router.post('/refresh', validateRequest(RefreshTokenSchema), refresh);

export default router;