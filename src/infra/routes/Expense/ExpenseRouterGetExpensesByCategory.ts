import {Router } from "express"
import { ExpenseFactoryGetExpenseByCategory } from "../../factory/Expense/ExpenseFacotryGetExpenseByCategory"
import { Expense } from "../../../data/models/Expense";

async function ExpenseRouterGetExpensesByCategory(){

    const expense = await ExpenseFactoryGetExpenseByCategory();

    const router = Router();

    
    /**
 * @swagger
 * /expenses/{category}/{userId}:
 *   get:
 *     summary: Lista despesas por categoria e usuário
 *     tags:
 *       - Despesas
 *     description: Retorna todas as despesas de um usuário filtradas por categoria.
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Categoria da despesa
 *         schema:
 *           type: string
 *           example: casa
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do usuário (ObjectId do MongoDB)
 *         schema:
 *           type: string
 *           example: 67c3910819b59ec6b6418f7a
 *     responses:
 *       200:
 *         description: Lista de despesas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expenses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 67fc09e2962967344a0a5806
 *                       iduser:
 *                         type: string
 *                         example: 67c3910819b59ec6b6418f7a
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
 *         description: Categoria ou ID do usuário não fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoria e ID do usuário são obrigatórios.
 *       404:
 *         description: Nenhuma despesa encontrada para essa categoria e usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nenhuma despesa encontrada para essa categoria e usuário.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao buscar despesas por categoria.
 */

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