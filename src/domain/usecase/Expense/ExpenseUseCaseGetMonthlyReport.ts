import {Request, Response} from "express";
import { IExpenseRepositoryFind } from "../../../contract/repositories/IExpenseRepository";
import { IExpenseUseCaseGetMonthlyReport } from "../../../contract/usecase/IExpenseUseCase";
import { IUser } from "../../../contract/entities/IUser";
import { IExpense } from "../../../contract/entities/IExpense";


export class ExpenseUseCaseGetMonthlyReport implements IExpenseUseCaseGetMonthlyReport{
    private expenseRepositoryFind: IExpenseRepositoryFind<IExpense>;
    
    constructor(expenseRepositoryFind: IExpenseRepositoryFind<IExpense>){
        this.expenseRepositoryFind = expenseRepositoryFind;
    }
    async getMonthlyReport(userId: string, month: number, year: number): Promise<IExpense[]> {

        if (!userId) {
            throw new Error("UserId é obrigatório");
        }


        if (year < 1 || year > 9999) {
            throw new Error("Ano inválido");
        }

        if (month < 1 || month > 12) {
            throw new Error("Mês inválido");
        }
       const expenses = await this.expenseRepositoryFind.findAll();
       return expenses.filter(expense => {
        const expenseData = new Date(expense.date);
        return (
            expense.iduser === userId &&
            expenseData.getMonth() + 1 === month &&
            expenseData.getFullYear() === year
        );
       }
       )
    }

    

}