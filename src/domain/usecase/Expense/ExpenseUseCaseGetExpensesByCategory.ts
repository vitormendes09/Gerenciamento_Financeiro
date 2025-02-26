import { IExpenseRepositoryFind } from "../../../contract/repositories/IExpenseRepository";
import { IExpenseUseCaseGetExpensesByCategory } from "../../../contract/usecase/IExpenseUseCase";
import { IUser } from "../../../contract/entities/IUser";
import { IExpense } from "../../../contract/entities/IExpense";
import { Request, Response } from "express";
import exp from "constants";

export class ExpenseUseCaseGetExpensesByCategory implements IExpenseUseCaseGetExpensesByCategory {
    private expenseRepositoryFind: IExpenseRepositoryFind<IExpense>;

    constructor(expenseRepositoryFind: IExpenseRepositoryFind<IExpense>) {
        this.expenseRepositoryFind = expenseRepositoryFind;
    }
    async getExpensesByCategory(userId: string, category: string): Promise<IExpense[]> {
        const expense = await this.expenseRepositoryFind.findAll();
        const filteredExpenses = expense.filter(expense => String(expense.user.id) === userId && expense.category === category);
        return filteredExpenses;
    }

}