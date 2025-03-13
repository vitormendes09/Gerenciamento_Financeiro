import { Request, Response } from "express";
import {IExpenseControllerGetExpensesByUser} from "../../contract/controllers/IExpenseController";
import {IExpenseUseCaseGetExpensesByUser} from "../../contract/usecase/IExpenseUseCase";
import {IExpense} from "../../contract/entities/IExpense";
import {IExpenseRepositoryFind} from "../../contract/repositories/IExpenseRepository";

export class ExpenseControllerGetExpensesByUser implements IExpenseControllerGetExpensesByUser {
    private expenseUseCase: IExpenseUseCaseGetExpensesByUser;
    private expenseRepositoryFind: IExpenseRepositoryFind<IExpense>;

    constructor(expenseUseCase: IExpenseUseCaseGetExpensesByUser, expenseRepositoryFind: IExpenseRepositoryFind<IExpense>) {
        this.expenseUseCase = expenseUseCase;
        this.expenseRepositoryFind = expenseRepositoryFind;
    }

    async getExpensesByUser(userId:string, res:Response): Promise<Response> {
        try {
            if (!userId) {
                return res.status(400).json({ message: "O ID do usuário é obrigatório." });
            }
            const expenses = await this.expenseUseCase.getExpensesByUser(userId);
           if(!expenses|| expenses.length === 0){
               return res.status(404).json({message: "Nenhuma despesa encontrada."});
           }
            return res.status(200).json({ expenses });
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao buscar despesas por usuário.", error:
                    err
            });
        }

    }
} 