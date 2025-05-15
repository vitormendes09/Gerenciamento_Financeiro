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
exports.ExpenseControllerDeleteExpense = void 0;
class ExpenseControllerDeleteExpense {
    constructor(expenseUseCase, expenseRepositoryDelete) {
        this.expenseRepositoryDelete = expenseRepositoryDelete;
        this.expenseUseCase = expenseUseCase;
    }
    deleteExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const expense = yield this.expenseUseCase.deleteExpense(id);
                if (!expense.success) {
                    return Promise.resolve(res.status(400).json({ message: expense.message }));
                }
                return Promise.resolve(res.status(200).json({ message: expense.message }));
            }
            catch (err) {
                return Promise.resolve(res.status(500).json({ message: "Erro interno no servidor." }));
            }
        });
    }
}
exports.ExpenseControllerDeleteExpense = ExpenseControllerDeleteExpense;
