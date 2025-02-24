import { IExpense } from "../../contract/entities/IExpense";

import { IUser } from "../../contract/entities/IUser";


export class Expense {
    id: number | undefined;
    constructor(
        id: number | undefined,
        public user: IUser,
        public description: string,
        public amount: number,
        public date: Date,
        public category: string
    ){}

    public static toDomain(expense: IExpense): Expense{
        return new Expense(expense.id, expense.user, expense.description, expense.amount, expense.date, expense.category);
    }

    public static toDTO(expense: Expense): IExpense{
        return {
            id: expense.id,
            user: expense.user,
            description: expense.description,
            amount: expense.amount,
            date: expense.date,
            category: expense.category
        }
    }
}