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
            const { category } = req.params;
            const { userId } = req.params;
            const expenses = await this.expenseUseCase.getExpensesByCategory(userId, category);
            return res.status(200).json({ expenses });
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao buscar despesas por categoria.", error:
                    err
            });
        }

    }
}