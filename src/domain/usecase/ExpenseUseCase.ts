import { IExpenseRepositoryFind,IExpenseRepositoryDelete,IExpenseRepositoryInsert,IExpenseRepositoryUpdate } from "../../contract/repositories/IExpenseRepository";
import { IExpenseUseCase } from "../../contract/usecase/IExpenseUseCase";
import { IUser } from "../../contract/entities/IUser";
import { IExpense } from "../../contract/entities/IExpense";

interface ExpenseInput {
    userId: string;
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

export class ExpenseUseCase implements IExpenseUseCase{
    private expenseRepositoryFind: IExpenseRepositoryFind<IExpense>;
    private expenseRepositoryDelete: IExpenseRepositoryDelete;
    private expenseRepositoryInsert: IExpenseRepositoryInsert<IExpense>;
    private expenseRepositoryUpdate: IExpenseRepositoryUpdate<IExpense>;

    constructor(expenseRepositoryFind: IExpenseRepositoryFind<IExpense>, expenseRepositoryDelete: IExpenseRepositoryDelete, expenseRepositoryInsert: IExpenseRepositoryInsert<IExpense>, expenseRepositoryUpdate: IExpenseRepositoryUpdate<IExpense>){
        this.expenseRepositoryFind = expenseRepositoryFind;
        this.expenseRepositoryDelete = expenseRepositoryDelete;
        this.expenseRepositoryInsert = expenseRepositoryInsert;
        this.expenseRepositoryUpdate = expenseRepositoryUpdate;
    }
    async getExpensesByCategory(userId: string, category: string): Promise<IExpense[]> {
        const expenses = await this.expenseRepositoryFind.findAll();
        return expenses.filter(expense => expense.user.id === Number(userId) && expense.category === category);
    }
    async getMonthlyReport(userId: string, month: number, year: number): Promise<IExpense[]> {
        const expenses = await this.expenseRepositoryFind.findAll();
        return expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return (
                expense.user.id === Number(userId) &&
                expenseDate.getMonth() + 1 === month &&
                expenseDate.getFullYear() === year
            );
        });
    }

    updateExpense(userId: string, expenseId: string, data: Partial<ExpenseInput>): Promise<ExpenseOutput> {
        throw new Error("Method not implemented.");
    }
    async createExpense(input: ExpenseInput): Promise<ExpenseOutput> {
        const { userId, description, amount, date, category } = input;

        // Verificar se os campos obrigatórios foram fornecidos
        if (!description || amount === undefined) {
            return { success: false, message: "Os campos 'description' e 'amount' são obrigatórios." };
        }

        // Criar novo expense
        const user: IUser = {
            id: Number(userId),
            name: "",
            email: "",
            password: ""
        }; // Assuming IUser has an 'id' property
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

    async deleteExpense(userId: string, expenseId: string): Promise<ExpenseOutput> {
        const expense = await this.expenseRepositoryFind.findById(Number(expenseId));
        if (!expense) {
            return { success: false, message: "Despesa não encontrada." };
        }

        if (expense.user.id !== Number(userId)) {
            return { success: false, message: "Despesa não pertence ao usuário." };
        }

        await this.expenseRepositoryDelete.delete(Number(expenseId));
        return {
            success: true,
            message: "Despesa deletada com sucesso!"
        };

    }

    

    async getExpensesByUser(userId: string): Promise<IExpense[]> {
        const expenses = await this.expenseRepositoryFind.findAll();
        const userExpenses = expenses.filter(expense => expense.user.id === Number(userId));
        return userExpenses;
    }

 
}
