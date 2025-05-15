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
const ExpenseUseCaseGetExpensesByUser_1 = require("../../../src/domain/usecase/Expense/ExpenseUseCaseGetExpensesByUser");
const makeSUT = () => {
    const expenseRepositoryFindMock = {
        findByUserId: jest.fn().mockResolvedValue([]),
        findById: jest.fn(),
        findAll: jest.fn(),
        findByUserAndDate: jest.fn(),
        findByCategory: jest.fn(),
    };
    const useCase = new ExpenseUseCaseGetExpensesByUser_1.ExpenseUseCaseGetExpensesByUser(expenseRepositoryFindMock);
    return { useCase, expenseRepositoryFindMock };
};
describe("ExpenseUseCaseGetExpensesByUser", () => {
    it("Deve ser possível instanciar ExpenseUseCaseGetExpensesByUser", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });
    it("Deve buscar despesas por usuário com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        const userId = "user123";
        const expenses = [
            {
                id: "expense1",
                iduser: userId,
                description: "Compra de livro",
                amount: 100,
                date: new Date(),
                category: "Educação",
                status: true
            },
            {
                id: "expense2",
                iduser: userId,
                description: "Compra de material",
                amount: 200,
                date: new Date(),
                category: "Educação",
                status: true
            }
        ];
        expenseRepositoryFindMock.findByUserId = jest.fn().mockResolvedValue(expenses);
        const result = yield useCase.getExpensesByUser(userId);
        expect(expenseRepositoryFindMock.findByUserId).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryFindMock.findByUserId).toHaveBeenCalledWith(userId);
        expect(result).toEqual(expenses);
    }));
    it("Deve retornar uma lista vazia se não encontrar despesas para o usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        const userId = "user123";
        expenseRepositoryFindMock.findByUserId.mockResolvedValue([]);
        const result = yield useCase.getExpensesByUser(userId);
        expect(expenseRepositoryFindMock.findByUserId).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryFindMock.findByUserId).toHaveBeenCalledWith(userId);
        expect(result).toEqual([]);
    }));
    it("Deve retornar uma lista vazia se o usuário não tiver despesas", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        const userId = "user123";
        const expenses = [
            {
                id: "expense1",
                iduser: "outroUser",
                description: "Compra de livro",
                amount: 100,
                date: new Date(),
                category: "Educação",
                status: true
            },
            {
                id: "expense2",
                iduser: "outroUser",
                description: "Compra de material",
                amount: 200,
                date: new Date(),
                category: "Educação",
                status: true
            }
        ];
        expenseRepositoryFindMock.findByUserId = jest.fn().mockResolvedValue(expenses);
        const result = yield useCase.getExpensesByUser(userId);
        expect(expenseRepositoryFindMock.findByUserId).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryFindMock.findByUserId).toHaveBeenCalledWith(userId);
        expect(result).toEqual([]);
    }));
    it("Deve lançar um erro se o usuário for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        const userId = "";
        yield expect(useCase.getExpensesByUser(userId)).rejects.toThrow("UserId é obrigatório");
    }));
    it("Deve capturar erro inesperado e não quebrar a aplicação", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        expenseRepositoryFindMock.findByUserId.mockRejectedValue(new Error("Erro no banco de dados"));
        const userId = "user123";
        yield expect(useCase.getExpensesByUser(userId)).rejects.toThrow("Erro no banco de dados");
    }));
});
