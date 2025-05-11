"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
class Expense {
    constructor(id, user, description, amount, date, category, status) {
        this.user = user;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.status = status;
    }
    static toDTO(expense) {
        return {
            id: expense.id,
            iduser: expense.user,
            description: expense.description,
            amount: expense.amount,
            date: expense.date,
            category: expense.category,
            status: expense.status
        };
    }
}
exports.Expense = Expense;
