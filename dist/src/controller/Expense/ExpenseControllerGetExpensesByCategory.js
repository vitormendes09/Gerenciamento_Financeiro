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
exports.ExpenseControllerGetExpensesByCategory = void 0;
class ExpenseControllerGetExpensesByCategory {
    constructor(expenseUseCase, expenseRepositoryFind) {
        this.expenseUseCase = expenseUseCase;
        this.expenseRepositoryFind = expenseRepositoryFind;
    }
    getExpensesByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, userId } = req.params;
                if (!category || !userId) {
                    return res.status(400).json({ message: "Categoria e ID do usuário são obrigatórios." });
                }
                const expenses = yield this.expenseUseCase.getExpensesByCategory(userId, category);
                if (expenses.length === 0) {
                    return res.status(404).json({ message: "Nenhuma despesa encontrada para essa categoria e usuário." });
                }
                return res.status(200).json({ expenses });
            }
            catch (err) {
                return res.status(500).json({
                    message: "Erro ao buscar despesas por categoria."
                });
            }
        });
    }
}
exports.ExpenseControllerGetExpensesByCategory = ExpenseControllerGetExpensesByCategory;
