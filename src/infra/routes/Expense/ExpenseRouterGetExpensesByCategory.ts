import {Router } from "express"
import { ExpenseFactoryGetExpenseByCategory } from "../../factory/Expense/ExpenseFacotryGetExpenseByCategory"
import { Expense } from "../../../data/models/Expense";

async function ExpenseRouterGetExpensesByCategory(){

    const expense = await ExpenseFactoryGetExpenseByCategory();

    const router = Router();

    

    router.get("/expenses/:category/:userId", async (req, res) => {
        try {
            await expense.getExpensesByCategory(req, res)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar despesas" });
        }
    });

    return router;
}

export default ExpenseRouterGetExpensesByCategory;