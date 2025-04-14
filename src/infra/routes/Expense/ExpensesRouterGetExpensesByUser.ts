import {Router} from "express"
import { ExpenseFactoryExpenseByUser } from "../../factory/Expense/ExpenseFactoryExpenseByUser"

async function ExpenseRouterGetExpensesByUser() {
    
    const expense = await ExpenseFactoryExpenseByUser();

    const router = Router();

    /**
 * @swagger
 * /expense/{userid}:
 *   get:
 *     summary: Lista todas as despesas de um usuário
 *     tags:
 *       - Despesas
 *     description: Retorna todas as despesas cadastradas associadas a um usuário específico.
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: ID do usuário (ObjectId do MongoDB)
 *         schema:
 *           type: string
 *           example: 67d6519492ac0a187ebc0ae8
 *     responses:
 *       200:
 *         description: Lista de despesas do usuário encontrada com sucesso
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
 *         description: O ID do usuário não foi informado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: O ID do usuário é obrigatório.
 *       404:
 *         description: Nenhuma despesa encontrada para esse usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nenhuma despesa encontrada.
 *       500:
 *         description: Erro interno ao buscar as despesas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao buscar despesas por usuário.
 *                 error:
 *                   type: string
 *                   example: Descrição do erro interno
 */

    router.get("/expenses/:userid", async (req, res) => {
        try {
            await expense.getExpensesByUser(req.params.userid, res)
        } catch (error) { 
            res.status(500).json({ msg: "Erro ao buscar despesas" });
        }
    });

    return router;
}

export default ExpenseRouterGetExpensesByUser;