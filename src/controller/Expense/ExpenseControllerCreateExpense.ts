import { Request, Response } from 'express';
import { IExpenseControllerCreateExpense } from '../../contract/controllers/IExpenseController';
import { IExpenseUseCaseCreateExpense } from '../../contract/usecase/IExpenseUseCase';
import { IExpense } from '../../contract/entities/IExpense';


export class ExpenseControllerCreateExpense implements IExpenseControllerCreateExpense {
    private expenseUseCase: IExpenseUseCaseCreateExpense;


    constructor(expenseUseCase: IExpenseUseCaseCreateExpense) {
        this.expenseUseCase = expenseUseCase;
    }

    async createExpense(req: Request, res: Response): Promise<Response> {
        try {
            const { userId, description, amount, date, category } = req.body;

            if (!description || amount === undefined) {
                return res.status(400).json({ message: "Os campos 'description' e 'amount' são obrigatórios." });
            }

            if (!userId) {
                return res.status(400).json({ message: "O ID do usuário é obrigatório." });
            }

            const newExpense = { iduser: userId, description, amount, date, category, status: 'active' };
 
            const savedExpense = await this.expenseUseCase.createExpense(newExpense);

            return res.status(201).json({ message: savedExpense.message });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao criar despesa" });
        }


    }
}