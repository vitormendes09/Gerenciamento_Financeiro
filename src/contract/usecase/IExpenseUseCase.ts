import { IExpense } from "../entities/IExpense";

export interface ExpenseInput {
    iduser: string;
    description: string;
    amount: number;
    date: Date;
    category: string;
    status: string ;
}

export interface ExpenseOutput {
    success: boolean;
    message: string;
}


export interface IExpenseUseCaseCreateExpense {
    createExpense(input: ExpenseInput): Promise<ExpenseOutput>;
}

export interface IExpenseUseCaseDeleteExpense {
    deleteExpense(expenseId: string): Promise<ExpenseOutput>;
}

export interface IExpenseUseCaseGetExpensesByUser {
    getExpensesByUser(userId: string): Promise<IExpense[]>;
}

export interface IExpenseUseCaseGetExpensesByCategory {
    getExpensesByCategory(userId: string, category: string): Promise<IExpense[]>;
}

export interface IExpenseUseCaseGetMonthlyReport {
    getMonthlyReport(userId: string, month: number, year: number): Promise<IExpense[]>;
}
