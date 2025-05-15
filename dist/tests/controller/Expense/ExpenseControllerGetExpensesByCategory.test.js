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
const ExpenseControllerGetExpensesByCategory_1 = require("../../../src/controller/Expense/ExpenseControllerGetExpensesByCategory");
class ResponseFake {
    constructor() {
        this.endChamado = false;
    }
    status(statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    json(obj) {
        this.jsonData = obj;
        return this;
    }
    end() {
        this.endChamado = true;
        return this;
    }
}
const makeSUT = () => {
    const requestStub = {
        params: { category: "Alimentação", userId: "123" },
    };
    const responseFake = new ResponseFake();
    const useCaseMock = {
        getExpensesByCategory: jest.fn().mockResolvedValue([
            { id: "1", description: "Jantar", amount: 50, category: "Alimentação", userId: "123" },
        ]),
    };
    const repositoryMock = {
        findByUserId: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        findByCategory: jest.fn(),
        findByUserAndDate: jest.fn(),
    };
    const controller = new ExpenseControllerGetExpensesByCategory_1.ExpenseControllerGetExpensesByCategory(useCaseMock, repositoryMock);
    return { controller, requestStub, responseFake, useCaseMock };
};
describe("ExpenseControllerGetExpensesByCategory", () => {
    it("Deve ser possível instanciar ExpenseControllerGetExpensesByCategory", () => {
        const { controller } = makeSUT();
        expect(controller).toBeDefined();
    });
    it("Deve chamar o caso de uso corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        yield controller.getExpensesByCategory(requestStub, responseFake);
        expect(useCaseMock.getExpensesByCategory).toHaveBeenCalledTimes(1);
        expect(useCaseMock.getExpensesByCategory).toHaveBeenCalledWith("123", "Alimentação");
    }));
    it("Deve retornar status 200 e a lista de despesas da categoria", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake } = makeSUT();
        yield controller.getExpensesByCategory(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(200);
        expect(responseFake.jsonData).toEqual({
            expenses: [{ id: "1", description: "Jantar", amount: 50, category: "Alimentação", userId: "123" }],
        });
    }));
    it("Deve retornar status 400 se 'category' ou 'userId' estiverem ausentes", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake } = makeSUT();
        const requestStub = { params: {} };
        yield controller.getExpensesByCategory(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toEqual({ message: "Categoria e ID do usuário são obrigatórios." });
    }));
    it("Deve retornar status 404 se nenhuma despesa for encontrada", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.getExpensesByCategory.mockResolvedValue([]);
        yield controller.getExpensesByCategory(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(404);
        expect(responseFake.jsonData).toEqual({ message: "Nenhuma despesa encontrada para essa categoria e usuário." });
    }));
    it("Deve retornar status 500 se ocorrer um erro inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.getExpensesByCategory.mockRejectedValue(new Error("Erro interno"));
        yield controller.getExpensesByCategory(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(500);
        expect(responseFake.jsonData).toEqual({ message: "Erro ao buscar despesas por categoria." });
    }));
});
