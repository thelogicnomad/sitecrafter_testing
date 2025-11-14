import { Request, Response, NextFunction } from 'express';
import { AccountService } from '../services/accountService';
import { AccountCreateRequest } from '../types';

const accountService = new AccountService();

export const createAccount = async (req: Request<{}, {}, AccountCreateRequest['body']>, res: Response, next: NextFunction) => {
    try {
        const account = await accountService.createAccount(req.user!.id, req.body);
        res.status(201).json(account);
    } catch (error) {
        next(error);
    }
};

export const getAllAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accounts = await accountService.getUserAccounts(req.user!.id);
        res.status(200).json(accounts);
    } catch (error) {
        next(error);
    }
};

export const getAccountById = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    try {
        const account = await accountService.getAccountById(req.user!.id, req.params.id);
        res.status(200).json(account);
    } catch (error) {
        next(error);
    }
};

export const updateAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await accountService.updateAccount(req.user!.id, req.params.id, req.body);
        res.status(200).json(account);
    } catch (error) {
        next(error);
    }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await accountService.deleteAccount(req.user!.id, req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};