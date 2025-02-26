import { IExpenseRepositoryDelete, IExpenseRepositoryFind} from "../../../contract/repositories/IExpenseRepository";
import { IExpenseUseCaseDeleteExpense, ExpenseOutput, ExpenseInput } from "../../../contract/usecase/IExpenseUseCase";
import { IExpense } from "../../../contract/entities/IExpense";


export class ExpenseUseCaseDeleteExpense implements IExpenseUseCaseDeleteExpense{

    private expenseRepositoryDelete: IExpenseRepositoryDelete<IExpense>;
    private expenseRepositoryFind: IExpenseRepositoryFind<IExpense>;
    constructor (expenseRepositoryDelete: IExpenseRepositoryDelete<IExpense>, expenseRepositoryFind: IExpenseRepositoryFind<IExpense>){
        this.expenseRepositoryDelete = expenseRepositoryDelete;
        this.expenseRepositoryFind = expenseRepositoryFind;
    }
    async deleteExpense(userId: string, expenseId: string): Promise<ExpenseOutput> {
        const expenses = await this.expenseRepositoryFind.findAll();
        const expense = expenses.find(expense => expense.user.id === Number(userId) && expense.id === Number(expenseId));

        if(!expense){
            return Promise.resolve({ success: false, message: "Despesa não encontrada." });
        }

        if (expense.id !== undefined) {
            await this.expenseRepositoryDelete.delete(expense.id);
        } else {
            return Promise.resolve({ success: false, message: "ID da despesa é indefinido." });
        }

        return {
            success: true,
            message: "Despesa deletada com sucesso."
        }
    }


    
}