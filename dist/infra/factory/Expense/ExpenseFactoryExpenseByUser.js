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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseFactoryExpenseByUser = ExpenseFactoryExpenseByUser;
const ExpenseControllerGetExpensesByUser_1 = require("../../../controller/Expense/ExpenseControllerGetExpensesByUser");
const ExpenseUseCaseGetExpensesByUser_1 = require("../../../domain/usecase/Expense/ExpenseUseCaseGetExpensesByUser");
const ExpenseRepository_1 = require("../../../data/repository/ExpenseRepository");
const Expense_1 = require("../../../data/models/Expense");
const database_1 = __importDefault(require("../../../data/config/database"));
function ExpenseFactoryExpenseByUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
        const expenseRepository = new ExpenseRepository_1.ExpenseRepositoryFind(Expense_1.Expense);
        const expenseUseCase = new ExpenseUseCaseGetExpensesByUser_1.ExpenseUseCaseGetExpensesByUser(expenseRepository);
        const expenseController = new ExpenseControllerGetExpensesByUser_1.ExpenseControllerGetExpensesByUser(expenseUseCase, expenseRepository);
        return expenseController;
    });
}
