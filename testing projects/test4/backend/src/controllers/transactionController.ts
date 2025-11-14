import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transactionService';
import { TransactionCreateRequest } from '../types';

const transactionService = new TransactionService();

export const createTransaction = async (req: Request<{}, {}, TransactionCreateRequest['body']>, res: Response, next: NextFunction) => {
    try {
        const transaction = await transactionService.createTransaction(req.user!.id, req.body);
        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
};

export const getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await transactionService.getTransactions(req.user!.id, req.query);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getTransactionById = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    try {
        const transaction = await transactionService.getTransactionById(req.user!.id, req.params.id);
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
};

export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transaction = await transactionService.updateTransaction(req.user!.id, req.params.id, req.body);
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
};

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await transactionService.deleteTransaction(req.user!.id, req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const getTransactionSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const summary = await transactionService.getTransactionSummary(req.user!.id, req.query);
        res.status(200).json(summary);
    } catch (error) {
        next(error);
    }
};