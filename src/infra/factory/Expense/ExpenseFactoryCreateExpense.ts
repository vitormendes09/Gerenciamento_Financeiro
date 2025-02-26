import { IExpenseControllerCreateExpense } from "../../../contract/controllers/IExpenseController";
import { ExpenseControllerCreateExpense } from "../../../controller/Expense/ExpenseControllerCreateExpense";
import { IExpenseUseCaseCreateExpense } from "../../../contract/usecase/IExpenseUseCase";
import { ExpenseUseCaseCreateExpense } from "../../../domain/usecase/Expense/ExpenseUseCaseCreateExpense";
import { IExpenseRepositoryInsert } from "../../../contract/repositories/IExpenseRepository";
import { ExpenseRepositoryCreate } from "../../../data/repository/ExpenseRepository";
import { IExpense } from "../../../contract/entities/IExpense";
import connectDB from "../../../data/config/database";
import { Expense } from "../../../data/models/Expense";

export async function ExpenseFactoryCreateExpense() {

    await connectDB();
    const expenseRepository: IExpenseRepositoryInsert<IExpense> = new ExpenseRepositoryCreate(Expense);
    const expenseUseCase: IExpenseUseCaseCreateExpense = new ExpenseUseCaseCreateExpense(expenseRepository);
    const expenseController: IExpenseControllerCreateExpense = new ExpenseControllerCreateExpense(expenseUseCase);
    return expenseController
}








