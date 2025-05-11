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
exports.ExpenseControllerCreateExpense = void 0;
class ExpenseControllerCreateExpense {
    constructor(expenseUseCase) {
        this.expenseUseCase = expenseUseCase;
    }
    createExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, description, amount, date, category } = req.body;
                if (!description || amount === undefined) {
                    return res.status(400).json({ message: "Os campos 'description' e 'amount' são obrigatórios." });
                }
                if (!userId) {
                    return res.status(400).json({ message: "O ID do usuário é obrigatório." });
                }
                const newExpense = { iduser: userId, description, amount, date, category, status: 'active' };
                const savedExpense = yield this.expenseUseCase.createExpense(newExpense);
                return res.status(201).json({ message: savedExpense.message });
            }
            catch (err) {
                if (err.message === "Erro ao criar despesa") {
                    return res.status(400).json({ message: err.message });
                }
                return res.status(500).json({ message: "Erro interno do servidor" });
            }
        });
    }
}
exports.ExpenseControllerCreateExpense = ExpenseControllerCreateExpense;
