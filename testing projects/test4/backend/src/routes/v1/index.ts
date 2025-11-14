import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import accountRoutes from './accountRoutes';
import transactionRoutes from './transactionRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/accounts', accountRoutes);
router.use('/transactions', transactionRoutes);

export default router;