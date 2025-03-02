import {Router } from "express"
import { ExpenseFactoryDeleteExpense } from "../../factory/Expense/ExpenseFactoryDeleteExpense"

async function ExpenseRouterDeleteExpense(){
    const expense = await ExpenseFactoryDeleteExpense()

    const router = Router();

    router.delete("/expenses/:id", async (req, res) => {
        try {
            await expense.deleteExpense(req, res)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao deletar despesa" });

        }
    });

    return router;

}


export default ExpenseRouterDeleteExpense;

