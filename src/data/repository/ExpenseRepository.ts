import { IExpense} from "../../contract/entities/IExpense";
import { Model } from "mongoose";
import { IExpenseRepositoryInsert, IExpenseRepositoryFind, IExpenseRepositoryUpdate, IExpenseRepositoryDelete } from "../../contract/repositories/IExpenseRepository";


export class ExpenseRepository implements IExpenseRepositoryInsert<IExpense> {
    constructor(private expenseModel: Model<IExpense>){
         expenseModel: Model<IExpense>
    }

    async insert(id: number, expense: IExpense): Promise<void> {
       await this.expenseModel.create(expense);
    }
}

export class ExpenseRepositoryFind implements IExpenseRepositoryFind<IExpense> {
    constructor(private expenseModel: Model<IExpense>){}

    findById(id: number): Promise<IExpense | null> {
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
}

export class ExpenseRepositoryUpdate implements IExpenseRepositoryUpdate<IExpense> {
    constructor(private expenseModel: Model<IExpense>){}

    update(id: number, expense: IExpense): Promise<IExpense | null> {
        return this.expenseModel.findByIdAndUpdate(id, expense).exec();
    }
}

export class ExpenseRepositoryDelete implements IExpenseRepositoryDelete {
    constructor(private expenseModel: Model<IExpense>){}

    delete(id: number): Promise<boolean> {
        return this.expenseModel.findByIdAndDelete(id).exec().then(() => true);
    }
}