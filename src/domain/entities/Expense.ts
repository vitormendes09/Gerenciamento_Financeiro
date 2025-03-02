import { IExpense } from "../../contract/entities/IExpense";

import { IUser } from "../../contract/entities/IUser";


export class Expense {
    id: string | undefined;
    constructor(
        id: string | undefined,
        public user: string,
        public description: string,
        public amount: number,
        public date: Date,
        public category: string,
        public status: boolean
    ){}

  
    public static toDTO(expense: Expense): IExpense{
        return {
            id: expense.id,
            iduser: expense.user,
            description: expense.description,
            amount: expense.amount,
            date: expense.date,
            category: expense.category,
            status: expense.status
        }
    }
}