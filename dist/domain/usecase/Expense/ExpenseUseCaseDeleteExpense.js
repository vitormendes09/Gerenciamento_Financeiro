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
exports.ExpenseUseCaseDeleteExpense = void 0;
class ExpenseUseCaseDeleteExpense {
    constructor(expenseRepositoryDelete, expenseRepositoryFind) {
        this.expenseRepositoryDelete = expenseRepositoryDelete;
        this.expenseRepositoryFind = expenseRepositoryFind;
    }
    deleteExpense(expenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = yield this.expenseRepositoryFind.findById(expenseId);
            if (!expense) {
                return Promise.resolve({ success: false, message: "Despesa não encontrada." });
            }
            yield this.expenseRepositoryDelete.delete(expenseId);
            return {
                success: true,
                message: "Despesa deletada com sucesso."
            };
        });
    }
}
exports.ExpenseUseCaseDeleteExpense = ExpenseUseCaseDeleteExpense;
