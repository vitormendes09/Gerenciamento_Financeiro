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
exports.ExpenseControllerGetMothlyReport = void 0;
class ExpenseControllerGetMothlyReport {
    constructor(expenseUseCase, expenseRepositoryFind) {
        this.expenseRepositoryFind = expenseRepositoryFind;
        this.expenseUseCase = expenseUseCase;
    }
    getMonthlyReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { month, year } = req.params;
                const { userId } = req.params;
                const report = yield this.expenseUseCase.getMonthlyReport(userId, parseInt(month), parseInt(year));
                return res.status(200).json({ report });
            }
            catch (err) {
                return res.status(500).json({ message: "Erro ao gerar relatório mensal.", error: err });
            }
        });
    }
}
exports.ExpenseControllerGetMothlyReport = ExpenseControllerGetMothlyReport;
