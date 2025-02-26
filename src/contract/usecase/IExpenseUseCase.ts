import { IExpense } from "../entities/IExpense";

export interface ExpenseInput {
    userId: string;
    description: string;
    amount: number;
    date: Date;
    category: string;
}

export interface ExpenseOutput {
    success: boolean;
    message: string;
    expense?: IExpense;
}
export interface IExpenseUseCase  {
    createExpense(input: ExpenseInput): Promise<ExpenseOutput>;
    deleteExpense(userId: string, expenseId: string): Promise<ExpenseOutput>;
    updateExpense(userId: string, expenseId: string, data: Partial<ExpenseInput>): Promise<ExpenseOutput>;
    getExpensesByUser(userId: string): Promise<IExpense[]>;
    getExpensesByCategory(userId: string, category: string): Promise<IExpense[]>;
    getMonthlyReport(userId: string, month: number, year: number): Promise<IExpense[]>;
}

export interface IExpenseUseCaseCreateExpense {
    createExpense(input: ExpenseInput): Promise<ExpenseOutput>;
}

export interface IExpenseUseCaseDeleteExpense {
    deleteExpense(userId: string, expenseId: string): Promise<ExpenseOutput>;
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
