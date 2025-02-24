import mongoose, { Document } from "mongoose";

import { IExpense } from "../../contract/entities/IExpense";



const ExpenseSchema = new mongoose.Schema<IExpense>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true }
});

export const Expense = mongoose.model<IExpense>("Expense", ExpenseSchema);
