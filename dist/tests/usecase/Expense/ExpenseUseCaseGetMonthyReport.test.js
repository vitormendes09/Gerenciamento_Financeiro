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
const ExpenseUseCaseGetMonthlyReport_1 = require("../../../src/domain/usecase/Expense/ExpenseUseCaseGetMonthlyReport");
const makeSUT = () => {
    const expenseRepositoryFindMock = {
        findByUserId: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn().mockResolvedValue([]),
        findByUserAndDate: jest.fn(),
        findByCategory: jest.fn(),
    };
    const useCase = new ExpenseUseCaseGetMonthlyReport_1.ExpenseUseCaseGetMonthlyReport(expenseRepositoryFindMock);
    return { useCase, expenseRepositoryFindMock };
};
describe("ExpenseUseCaseGetMonthlyReport", () => {
    it("Deve ser possível instanciar ExpenseUseCaseGetMonthlyReport", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });
    it("Deve buscar despesas por mês e ano com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        const userId = "user123";
        const month = 6;
        const year = 2022;
        const expenses = [
            {
                id: "expense1",
                iduser: userId,
                description: "Compra de livro",
                amount: 100,
                date: new Date('2022-06-01'),
                category: "Educação",
                status: true
            },
            {
                id: "expense2",
                iduser: userId,
                description: "Compra de material",
                amount: 200,
                date: new Date('2022-06-15'),
                category: "Educação",
                status: true
            },
            {
                id: "expense3",
                iduser: userId,
                description: "Compra de outro material",
                amount: 300,
                date: new Date('2022-05-15'),
                category: "Educação",
                status: true
            }
        ];
        expenseRepositoryFindMock.findAll = jest.fn().mockResolvedValue(expenses);
        const result = yield useCase.getMonthlyReport(userId, month, year);
        expect(expenseRepositoryFindMock.findAll).toHaveBeenCalledTimes(1);
        // Verifique se o método getMonthlyReport está retornando as despesas corretas
        const filteredExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === year && expense.iduser === userId;
        });
        expect(result).toEqual(filteredExpenses);
    }));
    it("Deve buscar despesas por mês e ano com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        const userId = "user123";
        const month = 6;
        const year = 2022;
        const expenses = [
            {
                id: "expense1",
                iduser: userId,
                description: "Compra de livro",
                amount: 100,
                date: new Date('2022-06-01'),
                category: "Educação",
                status: true
            },
            {
                id: "expense2",
                iduser: userId,
                description: "Compra de material",
                amount: 200,
                date: new Date('2022-06-15'),
                category: "Educação",
                status: true
            },
            {
                id: "expense3",
                iduser: "outroUser",
                description: "Compra de outro material",
                amount: 300,
                date: new Date('2022-06-15'),
                category: "Educação",
                status: true
            }
        ];
        expenseRepositoryFindMock.findAll = jest.fn().mockResolvedValue(expenses);
        const result = yield useCase.getMonthlyReport(userId, month, year);
        expect(expenseRepositoryFindMock.findAll).toHaveBeenCalledTimes(1);
        // Verifique se o método getMonthlyReport está retornando as despesas corretas
        const filteredExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expense.iduser === userId && expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === year;
        });
        expect(result).toEqual(filteredExpenses);
    }));
    it("Deve lançar um erro se o usuário for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        const userId = "";
        const month = 6;
        const year = 2022;
        yield expect(useCase.getMonthlyReport(userId, month, year)).rejects.toThrow("UserId é obrigatório");
    }));
    it("Deve lançar um erro se o mês for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        const userId = "user123";
        const month = 13;
        const year = 2022;
        yield expect(useCase.getMonthlyReport(userId, month, year)).rejects.toThrow("Mês inválido");
    }));
    it("Deve lançar um erro se o ano for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        const userId = "user123";
        const month = 6;
        const year = 0;
        yield expect(useCase.getMonthlyReport(userId, month, year)).rejects.toThrow("Ano inválido");
    }));
});
