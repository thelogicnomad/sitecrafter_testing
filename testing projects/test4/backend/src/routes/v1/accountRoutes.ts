import { Router } from 'express';
import * as accountController from '../../controllers/accountController';
import { authenticateToken } from '../../core/middleware/authMiddleware';
import { validateRequest } from '../../core/middleware/validationMiddleware';
import { AccountCreateSchema, UpdateAccountSchema, MongoIdParamSchema } from '../../types/validationSchemas';

const router = Router();

router.use(authenticateToken);

router.route('/')
    .post(validateRequest(AccountCreateSchema), accountController.createAccount)
    .get(accountController.getAllAccounts);

router.route('/:id')
    .get(validateRequest(MongoIdParamSchema), accountController.getAccountById)
    .put(validateRequest(UpdateAccountSchema), accountController.updateAccount)
    .delete(validateRequest(MongoIdParamSchema), accountController.deleteAccount);

export default router;