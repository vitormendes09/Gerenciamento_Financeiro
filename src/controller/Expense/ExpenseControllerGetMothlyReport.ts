import { Request, Response } from 'express';
import { IExpenseControllerGetMonthlyReport } from '../../contract/controllers/IExpenseController';
import { IExpenseUseCaseGetMonthlyReport } from '../../contract/usecase/IExpenseUseCase';
import { IExpense } from '../../contract/entities/IExpense';
import { IExpenseRepositoryFind } from '../../contract/repositories/IExpenseRepository';

export class ExpenseControllerGetMothlyReport implements IExpenseControllerGetMonthlyReport {
    private expenseUseCase: IExpenseUseCaseGetMonthlyReport;
    private expenseRepositoryFind: IExpenseRepositoryFind<IExpense>;

    constructor(expenseUseCase: IExpenseUseCaseGetMonthlyReport, expenseRepositoryFind: IExpenseRepositoryFind<IExpense>) {
        this.expenseRepositoryFind = expenseRepositoryFind;
        this.expenseUseCase = expenseUseCase;

    }
    async getMonthlyReport(req: Request, res: Response): Promise<Response> {
        try {
            const { month, year } = req.params;
            const { userId } = req.params;
            const report = await this.expenseUseCase.getMonthlyReport(userId, parseInt(month), parseInt(year));
            return res.status(200).json({ report });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao gerar relatório mensal.", error: err });
        }

    }
}

