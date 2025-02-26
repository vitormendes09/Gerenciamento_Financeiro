import { IExpenseControllerDeleteExpense } from "../../../contract/controllers/IExpenseController";
import { ExpenseControllerDeleteExpense } from "../../../controller/Expense/ExpenseControllerDeleteExpense";
import { IExpenseUseCaseDeleteExpense } from "../../../contract/usecase/IExpenseUseCase";
import { ExpenseUseCaseDeleteExpense } from "../../../domain/usecase/Expense/ExpenseUseCaseDeleteExpense";
import { IExpenseRepositoryDelete, IExpenseRepositoryFind } from "../../../contract/repositories/IExpenseRepository";
import { ExpenseRepositoryDelete, ExpenseRepositoryFind } from "../../../data/repository/ExpenseRepository";
import { IExpense } from "../../../contract/entities/IExpense";
import { Expense } from "../../../data/models/Expense";
import connectDB from "../../../data/config/database";

export async function ExpenseFactoryDeleteExpense(){
    await connectDB();
    const expenseRepositoryDelete: IExpenseRepositoryDelete<IExpense> = new ExpenseRepositoryDelete(Expense);
    const expenseRepositoryFind: IExpenseRepositoryFind<IExpense> = new ExpenseRepositoryFind(Expense)
    const expenseUseCase: IExpenseUseCaseDeleteExpense = new ExpenseUseCaseDeleteExpense(expenseRepositoryDelete, expenseRepositoryFind);

    const expenseController: IExpenseControllerDeleteExpense = new ExpenseControllerDeleteExpense(expenseUseCase, expenseRepositoryDelete);

    return expenseController;
}