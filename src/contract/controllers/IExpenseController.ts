import { Request, Response } from "express";

export interface IExpenseControllerCreateExpense {
    createExpense(req: Request, res: Response): Promise<Response>;
}

export interface IExpenseControllerDeleteExpense {
    deleteExpense(req: Request, res: Response): Promise<Response>;
}

export interface IExpenseControllerGetExpensesByUser {
    getExpensesByUser(userId: string, res: Response): Promise<Response>;
}

export interface IExpenseControllerGetExpensesByCategory {
    getExpensesByCategory(req: Request, res: Response): Promise<Response>;
}

export interface IExpenseControllerGetMonthlyReport {
    getMonthlyReport(req: Request, res: Response): Promise<Response>;
}
