"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ExpenseFactoryExpenseByUser_1 = require("../../factory/Expense/ExpenseFactoryExpenseByUser");
function ExpenseRouterGetExpensesByUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const expense = yield (0, ExpenseFactoryExpenseByUser_1.ExpenseFactoryExpenseByUser)();
        const router = (0, express_1.Router)();
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
        router.get("/expenses/:userid", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield expense.getExpensesByUser(req.params.userid, res);
            }
            catch (error) {
                res.status(500).json({ msg: "Erro ao buscar despesas" });
            }
        }));
        return router;
    });
}
exports.default = ExpenseRouterGetExpensesByUser;
