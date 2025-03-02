import {Router} from "express"
import { ExpenseFactoryExpenseByUser } from "../../factory/Expense/ExpenseFactoryExpenseByUser"

async function ExpenseRouterGetExpensesByUser() {
    
    const expense = await ExpenseFactoryExpenseByUser();

    const router = Router();

    router.get("/expense/:userid", async (req, res) => {
        try {
            await expense.getExpensesByUser(req.params.userid, res)
        } catch (error) { 
            res.status(500).json({ msg: "Erro ao buscar despesas" });
        }
    });

    return router;
}

export default ExpenseRouterGetExpensesByUser;