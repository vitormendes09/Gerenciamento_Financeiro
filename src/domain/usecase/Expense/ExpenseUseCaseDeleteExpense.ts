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
    async deleteExpense( expenseId: string): Promise<ExpenseOutput> {
        const expense = await this.expenseRepositoryFind.findById(expenseId);
       

        if(!expense){
            return Promise.resolve({ success: false, message: "Despesa não encontrada." });
        }

        await this.expenseRepositoryDelete.delete(expenseId);

        return {
            success: true,
            message: "Despesa deletada com sucesso."
        }
    }


    
}