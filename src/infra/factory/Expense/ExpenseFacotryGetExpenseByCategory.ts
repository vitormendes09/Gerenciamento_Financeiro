import { IExpenseControllerGetExpensesByCategory } from "../../../contract/controllers/IExpenseController";
import { ExpenseControllerGetExpensesByCategory } from "../../../controller/Expense/ExpenseControllerGetExpensesByCategory";
import { IExpenseUseCaseGetExpensesByCategory } from "../../../contract/usecase/IExpenseUseCase";
import { ExpenseUseCaseGetExpensesByCategory } from "../../../domain/usecase/Expense/ExpenseUseCaseGetExpensesByCategory";
import { IExpenseRepositoryFind } from "../../../contract/repositories/IExpenseRepository";
import { ExpenseRepositoryFind } from "../../../data/repository/ExpenseRepository";
import { IExpense } from "../../../contract/entities/IExpense";
import {Expense} from "../../../data/models/Expense"
import connectDB from "../../../data/config/database";


export async function ExpenseFactoryGetExpenseByCategory(){
    await connectDB();

    const expenseRepository: IExpenseRepositoryFind<IExpense> = new ExpenseRepositoryFind(Expense);
    const expenseUseCase: IExpenseUseCaseGetExpensesByCategory = new ExpenseUseCaseGetExpensesByCategory(expenseRepository);
    const expenseController: IExpenseControllerGetExpensesByCategory = new ExpenseControllerGetExpensesByCategory(expenseUseCase, expenseRepository)
    
    return expenseController;
}






















