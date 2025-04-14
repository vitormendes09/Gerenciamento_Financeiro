import {Router } from "express"
import { ExpenseFactoryGetMonthlyReport } from "../../factory/Expense/ExpenseFacotryGetMonthlyReport"

async function ExpenseRouterGetMonthlyReport(){
    const expense = await ExpenseFactoryGetMonthlyReport();
    const router = Router();
    

    
    /**
 * @swagger
 * /expenses/monthly/{userId}/{month}/{year}:
 *   get:
 *     summary: Gera relatório mensal de despesas do usuário
 *     tags:
 *       - Despesas
 *     description: Retorna todas as despesas de um usuário filtradas por mês e ano.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do usuário (ObjectId do MongoDB)
 *         schema:
 *           type: string
 *           example: 67d6519492ac0a187ebc0ae8
 *       - in: path
 *         name: month
 *         required: true
 *         description: Mês (1 a 12)
 *         schema:
 *           type: integer
 *           example: 4
 *       - in: path
 *         name: year
 *         required: true
 *         description: Ano (ex: 2025)
 *         schema:
 *           type: integer
 *           example: 2025
 *     responses:
 *       200:
 *         description: Relatório mensal gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 report:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 67fbf2755e07b28051c34b88
 *                       iduser:
 *                         type: string
 *                         example: 67d6519492ac0a187ebc0ae8
 *                       description:
 *                         type: string
 *                         example: luz
 *                       amount:
 *                         type: number
 *                         example: 150
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-02-24T10:00:00.000Z
 *                       category:
 *                         type: string
 *                         example: casa
 *                       __v:
 *                         type: integer
 *                         example: 0
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: UserId é obrigatório
 *       500:
 *         description: Erro interno ao gerar o relatório
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao gerar relatório mensal.
 *                 error:
 *                   type: string
 *                   example: Detalhes do erro interno
 */

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