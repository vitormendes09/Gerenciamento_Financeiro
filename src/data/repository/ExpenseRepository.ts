import { IExpense} from "../../contract/entities/IExpense";
import { Model } from "mongoose";
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

    findById(id: string): Promise<IExpense | null> {
        return this.expenseModel.findById(id).exec();
    }

    findAll(): Promise<IExpense[]> {
        return this.expenseModel.find().exec();
    }

    findByCategory(category: string): Promise<IExpense[]> {
        return this.expenseModel.find
        ({
            category: category
        }).exec();
    }


    findByUserId(userId: string): Promise<IExpense[]> {
        return this.expenseModel.find({ iduser: userId }).exec();
    }
    
    
}

export class ExpenseRepositoryDelete implements IExpenseRepositoryDelete<IExpense>{
    constructor(private expenseModel: Model<IExpense>){}
    delete(id: string): unknown {
        return this.expenseModel.findByIdAndDelete(id).exec().then(() => true);
    }
    findById(id: string): Promise<boolean> {
        return this.expenseModel.findById(id).exec().then(doc => !!doc);
    }
   

}



