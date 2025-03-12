import { IExpense} from "../../contract/entities/IExpense";
import mongoose, { Model } from "mongoose";
import { IExpenseRepositoryInsert, IExpenseRepositoryFind, IExpenseRepositoryDelete  } from "../../contract/repositories/IExpenseRepository";
import { IExpenseControllerDeleteExpense } from "../../contract/controllers/IExpenseController";
import { Request, Response } from "express";


export class ExpenseRepositoryCreate implements IExpenseRepositoryInsert<IExpense> {
    constructor(private expenseModel: Model<IExpense>){
         expenseModel: Model<IExpense>
    }

    async insert(id: string, expense: IExpense): Promise<void> {
       await this.expenseModel.create(expense);
    }
}

export class ExpenseRepositoryFind implements IExpenseRepositoryFind<IExpense> {
    constructor(private expenseModel: Model<IExpense>){}
    async findByUserAndDate(userId: string, month: number, year: number): Promise<IExpense[]> {
        return this.expenseModel.find({
            iduser: userId,
            date: {
                $gte: new Date(year, month - 1, 1), // Primeiro dia do mês
                $lt: new Date(year, month, 1) // Primeiro dia do próximo mês
            }
        }).exec();
    }

    findById(id: string): Promise<IExpense | null> {
        return this.expenseModel.findById(id).exec();
    }

    findAll(): Promise<IExpense[]> {
        return this.expenseModel.find().exec();
    }

    findByCategory(userId: string,category: string): Promise<IExpense[]> {
        return this.expenseModel.find({ category: category, iduser:userId }).exec();
    }


    findByUserId(userId: string): Promise<IExpense[]> {
        return this.expenseModel.find({ iduser: new mongoose.Types.ObjectId(userId) }).exec();
    }
    
    
}

export class ExpenseRepositoryDelete implements IExpenseRepositoryDelete<IExpense>{
    constructor(private expenseModel: Model<IExpense>){}
    delete(id: string): unknown {
        return this.expenseModel.findByIdAndDelete(id).exec();
    }
    findById(id: string): Promise<boolean> {
        return this.expenseModel.findById(id).exec().then(doc => !!doc);
    }
}



