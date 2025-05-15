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
const ExpenseUseCaseDeleteExpense_1 = require("../../../src/domain/usecase/Expense/ExpenseUseCaseDeleteExpense");
const makeSUT = () => {
    const expenseRepositoryFindMock = {
        findById: jest.fn().mockResolvedValue({
            iduser: "user123",
            description: "Compra de material",
            amount: 100.5,
            date: new Date(),
            category: "Educação",
            status: true
        }),
        findAll: jest.fn(),
        findByCategory: jest.fn(),
        findByUserId: jest.fn(),
        findByUserAndDate: jest.fn()
    };
    const expenseRepositoryDeleteMock = {
        delete: jest.fn().mockReturnValue(Promise.resolve(true)),
        findById: jest.fn()
    };
    const useCase = new ExpenseUseCaseDeleteExpense_1.ExpenseUseCaseDeleteExpense(expenseRepositoryDeleteMock, expenseRepositoryFindMock);
    return { useCase, expenseRepositoryDeleteMock, expenseRepositoryFindMock };
};
describe("ExpenseUseCaseDeleteExpense", () => {
    it("Deve ser possível instanciar ExpenseUseCaseDeleteExpense", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });
    const expenseId = "expense123";
    it("Deve deletar uma despesa com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryDeleteMock, expenseRepositoryFindMock } = makeSUT();
        const expenseId = "expense123";
        const result = yield useCase.deleteExpense(expenseId);
        expect(expenseRepositoryFindMock.findById).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryFindMock.findById).toHaveBeenCalledWith(expenseId);
        expect(expenseRepositoryDeleteMock.delete).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryDeleteMock.delete).toHaveBeenCalledWith(expenseId);
        expect(result).toEqual({
            success: true,
            message: "Despesa deletada com sucesso."
        });
    }));
    it("Deve retornar erro se a despesa não for encontrada", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryFindMock, expenseRepositoryDeleteMock } = makeSUT();
        const expenseId = "expense123";
        // Simulando que a despesa não foi encontrada
        expenseRepositoryFindMock.findById.mockResolvedValue(null);
        const result = yield useCase.deleteExpense(expenseId);
        expect(expenseRepositoryFindMock.findById).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryFindMock.findById).toHaveBeenCalledWith(expenseId);
        expect(expenseRepositoryDeleteMock.delete).not.toHaveBeenCalled(); // Alterado aqui
        expect(result).toEqual({
            success: false,
            message: "Despesa não encontrada."
        });
    }));
});
