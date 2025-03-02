import {Router } from "express";
import { ExpenseFactoryCreateExpense } from "../../factory/Expense/ExpenseFactoryCreateExpense";

async function ExpenseRouterCreateExpense(){

    const expense = await ExpenseFactoryCreateExpense();

    const router = Router();

    router.post("/expenses", async (req, res) => {
        try {
            await expense.createExpense(req, res)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao criar despesa" });
        }
    });

    return router;  
}

export default ExpenseRouterCreateExpense;