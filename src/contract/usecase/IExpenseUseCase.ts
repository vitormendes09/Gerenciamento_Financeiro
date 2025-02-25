import { IExpense } from "../entities/IExpense";

interface ExpenseInput {
    userId: string;
    description: string;
    amount: number;
    date: Date;
    category: string;
}

interface ExpenseOutput {
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