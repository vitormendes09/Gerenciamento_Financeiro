import { IExpenseControllerGetMonthlyReport } from "../../../contract/controllers/IExpenseController";
import { ExpenseControllerGetMothlyReport } from "../../../controller/Expense/ExpenseControllerGetMothlyReport"; 
import { IExpenseUseCaseGetMonthlyReport } from "../../../contract/usecase/IExpenseUseCase";
import { ExpenseUseCaseGetMonthlyReport } from "../../../domain/usecase/Expense/ExpenseUseCaseGetMonthlyReport";
import { IExpenseRepositoryFind } from "../../../contract/repositories/IExpenseRepository";
import { ExpenseRepositoryFind } from "../../../data/repository/ExpenseRepository";
import { IExpense } from "../../../contract/entities/IExpense";
import { Expense } from "../../../data/models/Expense";
import connectDB from "../../../data/config/database";

export async function ExpenseFactoryGetMonthlyReport() {
    await connectDB();
    const expenseRepository: IExpenseRepositoryFind<IExpense> = new ExpenseRepositoryFind(Expense);
    const expenseUseCase: IExpenseUseCaseGetMonthlyReport = new ExpenseUseCaseGetMonthlyReport(expenseRepository);
    const expenseController: IExpenseControllerGetMonthlyReport = new ExpenseControllerGetMothlyReport(expenseUseCase, expenseRepository);
    return expenseController;









}







