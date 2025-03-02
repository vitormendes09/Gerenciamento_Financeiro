import { Types } from "mongoose";


export interface IExpense {
    id?: string;
    iduser: Types.ObjectId | string;
    description: string;
    amount: number;
    date: Date;
    category: string
    status: boolean;
}