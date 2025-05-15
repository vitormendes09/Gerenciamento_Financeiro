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
const ExpenseFactoryCreateExpense_1 = require("../../factory/Expense/ExpenseFactoryCreateExpense");
function ExpenseRouterCreateExpense() {
    return __awaiter(this, void 0, void 0, function* () {
        const expense = yield (0, ExpenseFactoryCreateExpense_1.ExpenseFactoryCreateExpense)();
        const router = (0, express_1.Router)();
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
        router.post("/expenses", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield expense.createExpense(req, res);
            }
            catch (error) {
                res.status(500).json({ msg: "Erro ao criar despesa" });
            }
        }));
        return router;
    });
}
exports.default = ExpenseRouterCreateExpense;
