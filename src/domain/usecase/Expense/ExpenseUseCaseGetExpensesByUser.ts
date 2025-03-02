import { Request, Response} from "express";
import { IExpenseRepositoryFind } from "../../../contract/repositories/IExpenseRepository";
import { IExpenseUseCaseGetExpensesByUser } from "../../../contract/usecase/IExpenseUseCase";
import { IUser } from "../../../contract/entities/IUser";
import { IExpense } from "../../../contract/entities/IExpense";

export class ExpenseUseCaseGetExpensesByUser implements IExpenseUseCaseGetExpensesByUser{
    private expenseRepositoryFind: IExpenseRepositoryFind<IExpense>;
    constructor(expenseRepositoryFind: IExpenseRepositoryFind<IExpense>){
        this.expenseRepositoryFind = expenseRepositoryFind;
    }

    
    async getExpensesByUser(userId: string): Promise<IExpense[]> {
      const expenses = await this.expenseRepositoryFind.findByUserId(userId);
      if (!expenses) {
        return []
;
      }
      const userExpenses = expenses.filter(expense => String(expense.iduser) === userId);
        return userExpenses;
    }

} 