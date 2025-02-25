import { ExpenseController } from "../../controller/ExpenseController";
import { ExpenseUseCase } from "../../domain/usecase/ExpenseUseCase";
import { ExpenseRepository, ExpenseRepositoryDelete, ExpenseRepositoryFind, ExpenseRepositoryUpdate } from "../../data/repository/ExpenseRepository";
import {Expense} from "../../data/models/Expense"
import connectDB from "../../data/config/database";

export async function ExpenseFactory() {
    await connectDB();

    
    

    const expenseRepositoryFind = new ExpenseRepositoryFind(Expense);
    const expenseRepositoryDelete = new ExpenseRepositoryDelete(Expense);
    const expenseRepositoryInsert = new ExpenseRepository(Expense);
    const expenseRepositoryUpdate = new ExpenseRepositoryUpdate(Expense);

   
    const expenseUseCase = new ExpenseUseCase(expenseRepositoryFind, expenseRepositoryDelete, expenseRepositoryInsert, expenseRepositoryUpdate);
    const expenseController = new ExpenseController(expenseUseCase, expenseRepositoryFind);
    return  expenseController;
}