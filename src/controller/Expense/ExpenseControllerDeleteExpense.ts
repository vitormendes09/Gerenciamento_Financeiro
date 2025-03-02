import { Request, Response } from "express";
import { IExpenseControllerDeleteExpense } from "../../contract/controllers/IExpenseController";
import { IExpenseUseCaseDeleteExpense } from "../../contract/usecase/IExpenseUseCase";
import { IExpenseRepositoryDelete } from "../../contract/repositories/IExpenseRepository";
import { IExpense } from "../../contract/entities/IExpense";


export class ExpenseControllerDeleteExpense implements IExpenseControllerDeleteExpense{
    private expenseUseCase: IExpenseUseCaseDeleteExpense;
    private expenseRepositoryDelete: IExpenseRepositoryDelete<IExpense>;

    constructor(expenseUseCase: IExpenseUseCaseDeleteExpense, expenseRepositoryDelete: IExpenseRepositoryDelete<IExpense>){
        this.expenseRepositoryDelete = expenseRepositoryDelete;
        this.expenseUseCase = expenseUseCase;
    }

    async deleteExpense(req: Request, res: Response): Promise<Response> {
        try{
            const {userId, expenseId} = req.params;
            const expense = await this.expenseUseCase.deleteExpense(userId, expenseId, false);
            if(!expense.success){
                return Promise.resolve(res.status(400).json({message: expense.message}));
            }   
            return Promise.resolve(res.status(200).json({message: expense.message}));

        } catch (err) {
            return Promise.resolve(res.status(500).json({message: "Erro interno no servidor."}));
        }
    }

}