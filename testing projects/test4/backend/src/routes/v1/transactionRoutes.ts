import { Router } from 'express';
import * as transactionController from '../../controllers/transactionController';
import { authenticateToken } from '../../core/middleware/authMiddleware';
import { validateRequest } from '../../core/middleware/validationMiddleware';
import { 
    TransactionCreateSchema, 
    TransactionGetSchema, 
    UpdateTransactionSchema, 
    MongoIdParamSchema 
} from '../../types/validationSchemas';

const router = Router();

router.use(authenticateToken);

router.route('/')
    .post(validateRequest(TransactionCreateSchema), transactionController.createTransaction)
    .get(validateRequest(TransactionGetSchema), transactionController.getAllTransactions);

router.get('/summary', transactionController.getTransactionSummary);

router.route('/:id')
    .get(validateRequest(MongoIdParamSchema), transactionController.getTransactionById)
    .put(validateRequest(UpdateTransactionSchema), transactionController.updateTransaction)
    .delete(validateRequest(MongoIdParamSchema), transactionController.deleteTransaction);

export default router;