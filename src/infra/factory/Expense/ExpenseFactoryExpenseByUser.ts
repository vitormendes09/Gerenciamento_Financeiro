import { IExpenseControllerGetExpensesByUser } from "../../../contract/controllers/IExpenseController";
import { ExpenseControllerGetExpensesByUser } from "../../../controller/Expense/ExpenseControllerGetExpensesByUser";
import { IExpenseUseCaseGetExpensesByUser } from "../../../contract/usecase/IExpenseUseCase";
import { ExpenseUseCaseGetExpensesByUser } from "../../../domain/usecase/Expense/ExpenseUseCaseGetExpensesByUser";
import { IExpenseRepositoryFind } from "../../../contract/repositories/IExpenseRepository";
import { ExpenseRepositoryFind } from "../../../data/repository/ExpenseRepository";
import { IExpense } from "../../../contract/entities/IExpense";
import { Expense } from "../../../data/models/Expense";
import connectDB from "../../../data/config/database";
import { UserRepositoryFind } from "../../../data/repository/UserRepository";

export async function ExpenseFactoryExpenseByUser() {
    await connectDB();
    const expenseRepository: IExpenseRepositoryFind<IExpense>  = new ExpenseRepositoryFind(Expense);
    const expenseUseCase: IExpenseUseCaseGetExpensesByUser = new ExpenseUseCaseGetExpensesByUser(expenseRepository);
    const expenseController: IExpenseControllerGetExpensesByUser = new ExpenseControllerGetExpensesByUser(expenseUseCase, expenseRepository);

    return expenseController;

}