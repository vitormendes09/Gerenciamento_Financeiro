import { IExpenseRepositoryInsert } from "../../../contract/repositories/IExpenseRepository";
import { IExpenseUseCaseCreateExpense, ExpenseInput, ExpenseOutput } from "../../../contract/usecase/IExpenseUseCase";
import { IExpense } from "../../../contract/entities/IExpense";
import { IUser } from "../../../contract/entities/IUser";

export class ExpenseUseCaseCreateExpense implements IExpenseUseCaseCreateExpense {
    private expenseRepositoryInsert: IExpenseRepositoryInsert<IExpense>;

    constructor(expenseRepositoryInsert: IExpenseRepositoryInsert<IExpense>) {
        this.expenseRepositoryInsert = expenseRepositoryInsert;
    }

    async createExpense(input: ExpenseInput): Promise<ExpenseOutput> {

            const { iduser, description, amount, date, category } = input;

            if (!description || amount === undefined) {
                return Promise.resolve({ success: false, message: "Os campos 'description' e 'amount' são obrigatórios." });
            }

            const newExpense: IExpense = {
                iduser, description, amount, date, category,
                status: true
            };

            const savedExpense = await this.expenseRepositoryInsert.insert(iduser, newExpense);

            return {
                success: true,
                message: "Despesa criada com sucesso.",
            }
        
        

        
    }

}
