import { IExpenseRepositoryFind } from "../../../contract/repositories/IExpenseRepository";
import { IExpenseUseCaseGetExpensesByCategory } from "../../../contract/usecase/IExpenseUseCase";

import { IExpense } from "../../../contract/entities/IExpense";



export class ExpenseUseCaseGetExpensesByCategory implements IExpenseUseCaseGetExpensesByCategory {
    private expenseRepositoryFind: IExpenseRepositoryFind<IExpense>;

    constructor(expenseRepositoryFind: IExpenseRepositoryFind<IExpense>) {
        this.expenseRepositoryFind = expenseRepositoryFind;
    }
    async getExpensesByCategory(userId: string, category: string): Promise<IExpense[]> {
        if (!userId) {
            throw new Error("UserId é obrigatório");
        }
        if (!category) {
            throw new Error("Category é obrigatória");
        }
        return this.expenseRepositoryFind.findByCategory(userId, category)
    }

}