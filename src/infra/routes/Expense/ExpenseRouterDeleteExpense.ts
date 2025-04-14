import {Router } from "express"
import { ExpenseFactoryDeleteExpense } from "../../factory/Expense/ExpenseFactoryDeleteExpense"

async function ExpenseRouterDeleteExpense(){
    const expense = await ExpenseFactoryDeleteExpense()

    const router = Router();
    /**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Deleta uma despesa por ID
 *     tags: [Despesas]
 *     description: Remove uma despesa específica do banco de dados a partir do ID fornecido. A despesa deve existir.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da despesa (ObjectId do MongoDB)
 *         schema:
 *           type: string
 *           example: 661a6072e7b5e8a472f85f7a
 *     responses:
 *       200:
 *         description: Despesa deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Despesa deletada com sucesso.
 *       400:
 *         description: Despesa não encontrada ou ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Despesa não encontrada.
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro interno no servidor.
 */


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

