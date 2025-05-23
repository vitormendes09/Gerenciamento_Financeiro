import { Request, Response } from "express";
import { IExpenseControllerGetExpensesByCategory } from "../../contract/controllers/IExpenseController";
import { IExpenseUseCaseGetExpensesByCategory } from "../../contract/usecase/IExpenseUseCase";
import { IExpense } from "../../contract/entities/IExpense";
import { IExpenseRepositoryFind } from "../../contract/repositories/IExpenseRepository";


export class ExpenseControllerGetExpensesByCategory implements IExpenseControllerGetExpensesByCategory {
    private expenseUseCase: IExpenseUseCaseGetExpensesByCategory;
    private expenseRepositoryFind: IExpenseRepositoryFind<IExpense>;

    constructor(expenseUseCase: IExpenseUseCaseGetExpensesByCategory, expenseRepositoryFind: IExpenseRepositoryFind<IExpense>) {
        this.expenseUseCase = expenseUseCase;
        this.expenseRepositoryFind = expenseRepositoryFind;
    }

    async getExpensesByCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { category, userId } = req.params;
            if(!category || !userId){
                return res.status(400).json({ message: "Categoria e ID do usuário são obrigatórios." });
            }
            
            const expenses = await this.expenseUseCase.getExpensesByCategory(userId, category);

            if (expenses.length === 0) {
                return res.status(404).json({ message: "Nenhuma despesa encontrada para essa categoria e usuário." });
            }

            return res.status(200).json({ expenses });
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao buscar despesas por categoria."
            });
        }

    }
}