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
const ExpenseFactoryDeleteExpense_1 = require("../../factory/Expense/ExpenseFactoryDeleteExpense");
function ExpenseRouterDeleteExpense() {
    return __awaiter(this, void 0, void 0, function* () {
        const expense = yield (0, ExpenseFactoryDeleteExpense_1.ExpenseFactoryDeleteExpense)();
        const router = (0, express_1.Router)();
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
        router.delete("/expenses/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield expense.deleteExpense(req, res);
            }
            catch (error) {
                res.status(500).json({ msg: "Erro ao deletar despesa" });
            }
        }));
        return router;
    });
}
exports.default = ExpenseRouterDeleteExpense;
