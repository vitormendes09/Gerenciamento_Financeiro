import { IExpenseRepositoryFind,IExpenseRepositoryDelete,IExpenseRepositoryInsert,IExpenseRepositoryUpdate } from "../../contract/repositories/IExpenseRepository";
import { IUseCase } from "../../contract/usecase/IUseCase";
import { IUser } from "../../contract/entities/IUser";
import { IExpense } from "../../contract/entities/IExpense";

interface ExpenseInput {
    user: IUser;
    description: string;
    amount: number;
    date: Date;
    category: string;
}

interface ExpenseOutput {
    success: boolean;
    message: string;
    expense?: IExpense;
}



export class ExpenseUseCase implements IUseCase<ExpenseInput, ExpenseOutput>{
    private expenseRepositoryFind: IExpenseRepositoryFind<IUser>;
    private expenseRepositoryDelete: IExpenseRepositoryDelete;
    private expenseRepositoryInsert: IExpenseRepositoryInsert<IExpense>;
    private expenseRepositoryUpdate: IExpenseRepositoryUpdate<IUser>;

    constructor(expenseRepositoryFind: IExpenseRepositoryFind<IUser>, expenseRepositoryDelete: IExpenseRepositoryDelete, expenseRepositoryInsert: IExpenseRepositoryInsert<IExpense>, expenseRepositoryUpdate: IExpenseRepositoryUpdate<IUser>){
        this.expenseRepositoryFind = expenseRepositoryFind;
        this.expenseRepositoryDelete = expenseRepositoryDelete;
        this.expenseRepositoryInsert = expenseRepositoryInsert;
        this.expenseRepositoryUpdate = expenseRepositoryUpdate;
    }
    async perform(input: ExpenseInput): Promise<ExpenseOutput> {
        const { user, description, amount, date, category } = input;

        // Verificar se os campos obrigatórios foram fornecidos
        if (!description || amount === undefined) {
            return { success: false, message: "Os campos 'description' e 'amount' são obrigatórios." };
        }

        // Criar novo expense
        const newExpense: IExpense = { user, description, amount, date, category };
        if (user.id === undefined) {
            return { success: false, message: "User ID is required." };
        }
        const savedExpense = await this.expenseRepositoryInsert.insert(user.id, newExpense);

        return {
            success: true,
            message: "Despesa cadastrada com sucesso!"
        };
    }
}
