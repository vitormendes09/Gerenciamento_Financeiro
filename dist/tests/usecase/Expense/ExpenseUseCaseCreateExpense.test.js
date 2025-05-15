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
const ExpenseUseCaseCreateExpense_1 = require("../../../src/domain/usecase/Expense/ExpenseUseCaseCreateExpense");
const makeSUT = () => {
    const expenseRepositoryMock = {
        insert: jest.fn().mockResolvedValue(true),
    };
    const useCase = new ExpenseUseCaseCreateExpense_1.ExpenseUseCaseCreateExpense(expenseRepositoryMock);
    return { useCase, expenseRepositoryMock };
};
describe("ExpenseUseCaseCreateExpense", () => {
    it("Deve ser possível instanciar ExpenseUseCaseCreateExpense", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });
    it("Deve criar uma despesa com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryMock } = makeSUT();
        const input = {
            iduser: "user123",
            description: "Compra de material",
            amount: 100.5,
            date: new Date(),
            category: "Educação",
            status: "true"
        };
        const result = yield useCase.createExpense(input);
        expect(expenseRepositoryMock.insert).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryMock.insert).toHaveBeenCalledWith(input.iduser, Object.assign(Object.assign({}, input), { status: true }));
        expect(result).toEqual({
            success: true,
            message: "Despesa criada com sucesso."
        });
    }));
    it("Deve retornar erro se 'description' estiver ausente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryMock } = makeSUT();
        const input = {
            iduser: "user123",
            description: "",
            amount: 100.5,
            date: new Date(),
            category: "Alimentação",
            status: "true"
        };
        const result = yield useCase.createExpense(input);
        expect(expenseRepositoryMock.insert).not.toHaveBeenCalled();
        expect(result).toEqual({
            success: false,
            message: "Os campos 'description' e 'amount' são obrigatórios."
        });
    }));
    it("Deve retornar erro se 'amount' estiver ausente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryMock } = makeSUT();
        const input = {
            iduser: "user123",
            description: "Compra de eletrônicos",
            amount: undefined,
            date: new Date(),
            category: "Tecnologia"
        }; // Forçando o tipo para simular um erro
        const result = yield useCase.createExpense(input);
        expect(expenseRepositoryMock.insert).not.toHaveBeenCalled();
        expect(result).toEqual({
            success: false,
            message: "Os campos 'description' e 'amount' são obrigatórios."
        });
    }));
    it("Deve capturar erro inesperado e não quebrar a aplicação", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, expenseRepositoryMock } = makeSUT();
        expenseRepositoryMock.insert.mockRejectedValue(new Error("Erro no banco de dados"));
        const input = {
            iduser: "user123",
            description: "Compra online",
            amount: 200,
            date: new Date(),
            category: "E-commerce",
            status: "true"
        };
        yield expect(useCase.createExpense(input)).rejects.toThrow("Erro no banco de dados");
    }));
});
