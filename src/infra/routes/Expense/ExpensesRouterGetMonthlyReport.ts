import {Router } from "express"
import { ExpenseFactoryGetMonthlyReport } from "../../factory/Expense/ExpenseFacotryGetMonthlyReport"

async function ExpenseRouterGetMonthlyReport(){
    const expense = await ExpenseFactoryGetMonthlyReport();
    const router = Router();
    

    router.get("/expenses/monthly/:userId/:month/:year", async (req, res) => {
        try {
            await expense.getMonthlyReport(req, res)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar relatório mensal de despesas" });
        }
    });
    return router;
}

export default ExpenseRouterGetMonthlyReport;