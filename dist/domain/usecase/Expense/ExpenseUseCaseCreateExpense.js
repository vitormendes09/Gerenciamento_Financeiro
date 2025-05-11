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
exports.ExpenseUseCaseCreateExpense = void 0;
class ExpenseUseCaseCreateExpense {
    constructor(expenseRepositoryInsert) {
        this.expenseRepositoryInsert = expenseRepositoryInsert;
    }
    createExpense(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { iduser, description, amount, date, category } = input;
            if (!description || amount === undefined) {
                return Promise.resolve({ success: false, message: "Os campos 'description' e 'amount' são obrigatórios." });
            }
            const newExpense = {
                iduser, description, amount, date, category,
                status: true
            };
            const savedExpense = yield this.expenseRepositoryInsert.insert(iduser, newExpense);
            return {
                success: true,
                message: "Despesa criada com sucesso.",
            };
        });
    }
}
exports.ExpenseUseCaseCreateExpense = ExpenseUseCaseCreateExpense;
