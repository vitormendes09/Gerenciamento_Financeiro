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
exports.ExpenseFactoryCreateExpense = ExpenseFactoryCreateExpense;
const ExpenseControllerCreateExpense_1 = require("../../../controller/Expense/ExpenseControllerCreateExpense");
const ExpenseUseCaseCreateExpense_1 = require("../../../domain/usecase/Expense/ExpenseUseCaseCreateExpense");
const ExpenseRepository_1 = require("../../../data/repository/ExpenseRepository");
const database_1 = __importDefault(require("../../../data/config/database"));
const Expense_1 = require("../../../data/models/Expense");
function ExpenseFactoryCreateExpense() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
        const expenseRepository = new ExpenseRepository_1.ExpenseRepositoryCreate(Expense_1.Expense);
        const expenseUseCase = new ExpenseUseCaseCreateExpense_1.ExpenseUseCaseCreateExpense(expenseRepository);
        const expenseController = new ExpenseControllerCreateExpense_1.ExpenseControllerCreateExpense(expenseUseCase);
        return expenseController;
    });
}
