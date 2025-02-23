import { IUser } from "../entities/IUser";

export interface IExpense {
    id: number;
    user: IUser;
    description: string;
    amount: number;
    date: Date;
}