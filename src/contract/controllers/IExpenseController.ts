import { Request, Response } from "express";

export interface IExpenseController {
    createExpense(req: Request, res: Response): Promise<Response>;
    deleteExpense(req: Request, res: Response): Promise<Response>;
    getExpensesByUser(req: Request, res: Response): Promise<Response>;
    getAllExpenses(req: Request, res: Response): Promise<Response>;
    getExpensesByCategory(req: Request, res: Response): Promise<Response>;
    getMonthlyReport(req: Request, res: Response): Promise<Response>;
}

export interface IExpenseControllerCreateExpense {
    createExpense(req: Request, res: Response): Promise<Response>;
}

export interface IExpenseControllerDeleteExpense {
    deleteExpense(req: Request, res: Response): Promise<Response>;
}

export interface IExpenseControllerGetExpensesByUser {
    getExpensesByUser(req: Request, res: Response): Promise<Response>;
}

export interface IExpenseControllerGetExpensesByCategory {
    getExpensesByCategory(req: Request, res: Response): Promise<Response>;
}

export interface IExpenseControllerGetMonthlyReport {
    getMonthlyReport(req: Request, res: Response): Promise<Response>;
}
