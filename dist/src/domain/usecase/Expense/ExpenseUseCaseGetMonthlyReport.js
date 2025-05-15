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
exports.ExpenseUseCaseGetMonthlyReport = void 0;
class ExpenseUseCaseGetMonthlyReport {
    constructor(expenseRepositoryFind) {
        this.expenseRepositoryFind = expenseRepositoryFind;
    }
    getMonthlyReport(userId, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error("UserId é obrigatório");
            }
            if (year < 1 || year > 9999) {
                throw new Error("Ano inválido");
            }
            if (month < 1 || month > 12) {
                throw new Error("Mês inválido");
            }
            const expenses = yield this.expenseRepositoryFind.findAll();
            return expenses.filter(expense => {
                const expenseData = new Date(expense.date);
                return (expense.iduser === userId &&
                    expenseData.getMonth() + 1 === month &&
                    expenseData.getFullYear() === year);
            });
        });
    }
}
exports.ExpenseUseCaseGetMonthlyReport = ExpenseUseCaseGetMonthlyReport;
