import {Router } from "express";
import { ExpenseFactoryCreateExpense } from "../../factory/Expense/ExpenseFactoryCreateExpense";

async function ExpenseRouterCreateExpense(){

    const expense = await ExpenseFactoryCreateExpense();

    const router = Router();

   /**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Cria uma nova despesa
 *     tags:
 *       - Despesas
 *     description: Registra uma nova despesa vinculada a um usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - description
 *               - amount
 *               - category
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 661a6072e7b5e8a472f85f7a
 *               description:
 *                 type: string
 *                 example: Compra no mercado
 *               amount:
 *                 type: number
 *                 example: 150.75
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-04-13T10:00:00.000Z
 *               category:
 *                 type: string
 *                 example: Alimentação
 *     responses:
 *       201:
 *         description: Despesa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Despesa criada com sucesso.
 *       400:
 *         description: Erro de validação ou dados obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Os campos 'description' e 'amount' são obrigatórios.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro interno no servidor
 */


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