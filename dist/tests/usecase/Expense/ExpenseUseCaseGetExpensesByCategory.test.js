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
const ExpenseUseCaseGetExpensesByCategory_1 = require("../../../src/domain/usecase/Expense/ExpenseUseCaseGetExpensesByCategory");
const makeSUT = () => {
    const expenseRepositoryFindMock = {
        findByCategory: jest.fn().mockResolvedValue([]),
        findByUserId: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        findByUserAndDate: jest.fn(),
    };
    const useCase = new ExpenseUseCaseGetExpensesByCategory_1.ExpenseUseCaseGetExpensesByCategory(expenseRepositoryFindMock);
    return { useCase, expenseRepositoryFindMock };
};
describe("ExpenseUseCaseGetExpensesByCategory", () => {
    it("Deve ser possível instanciar ExpenseUseCaseGetExpensesByCategory", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });
    it("Deve buscar despesas por categoria com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        const userId = "user123";
        const category = "Educação";
        const result = yield useCase.getExpensesByCategory(userId, category);
        expect(expenseRepositoryFindMock.findByCategory).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryFindMock.findByCategory).toHaveBeenCalledWith(userId, category);
        expect(result).toEqual([]);
    }));
    it("Deve retornar erro se 'userId' estiver ausente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        const userId = "";
        const category = "Educação";
        yield expect(useCase.getExpensesByCategory(userId, category)).rejects.toThrow("UserId é obrigatório");
    }));
    it("Deve retornar erro se 'category' estiver ausente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        const userId = "user123";
        const category = "";
        yield expect(useCase.getExpensesByCategory(userId, category)).rejects.toThrow("Category é obrigatória");
    }));
    it("Deve capturar erro inesperado e não quebrar a aplicação", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        expenseRepositoryFindMock.findByCategory.mockRejectedValue(new Error("Erro no banco de dados"));
        const userId = "user123";
        const category = "Educação";
        yield expect(useCase.getExpensesByCategory(userId, category)).rejects.toThrow("Erro no banco de dados");
    }));
});
