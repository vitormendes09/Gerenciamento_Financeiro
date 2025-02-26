import {Request, Response} from "express";  
import { IExpenseController } from "../contract/controllers/IExpenseController";
import { IExpenseUseCase } from "../contract/usecase/IExpenseUseCase";
import { IExpense } from "../contract/entities/IExpense";
import { IExpenseRepositoryFind } from  "../contract/repositories/IExpenseRepository";


export class ExpenseController implements IExpenseController{
    private expenseUseCase: IExpenseUseCase;
    private expenseRepositoryFind: IExpenseRepositoryFind<IExpense>;

    constructor(expenseUseCase: IExpenseUseCase, expenseRepositoryFind: IExpenseRepositoryFind<IExpense>){
        this.expenseRepositoryFind = expenseRepositoryFind;
        this.expenseUseCase = expenseUseCase;
        
    }
    getAllExpenses(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    async getExpensesByCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { category } = req.params;
            const { userId } = req.params;
            const expenses = await this.expenseUseCase.getExpensesByCategory(userId, category);
            return res.status(200).json({ expenses });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao buscar despesas por categoria.", error: err });
        }
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

    async createExpense(req: Request, res: Response): Promise<Response> {
        const {userId, description, amount, date, category} = req.body;

        if(!description || amount === undefined){
            return res.status(400).json({message: "Os campos 'description' e 'amount' são obrigatórios."});
        }

        if(!userId){
            return res.status(400).json({message: "O ID do usuário é obrigatório."});
        }

        const newExpense: IExpense = { user: userId, description, amount, date, category };
        const savedExpense = await this.expenseUseCase.createExpense({userId, description, amount, date, category});

        return res.status(201).json({message: savedExpense.message});
    }

    

    async deleteExpense(req: Request, res: Response): Promise<Response>{
        try{
            const {userId, expenseId} = req.params;

            const result = await this.expenseUseCase.deleteExpense(userId, expenseId);

            if(!result.success){
                return res.status(404).json({message: result.message});
            }
            return res.status(200).json({message: result.message});
        } catch(err){
            return res.status(500).json({message: "Erro interno no servidor.", error: err});
        }
    }

   

    async getExpensesByUser(req: Request, res: Response): Promise<Response>{
        try{
            const {userId} = req.params;
            const result = await this.expenseUseCase.getExpensesByUser(userId);

            if(!result ){
                return res.status(404).json({message:"Nenhuma despesa encontrada."});
            }
            return res.status(200).json({message: result, expenses: result});
        } catch(err){
            return res.status(500).json({message: "Erro interno no servidor.", error: err});
        }
    }

}