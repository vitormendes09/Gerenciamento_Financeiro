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
const ExpenseControllerGetExpensesByUser_1 = require("../../../src/controller/Expense/ExpenseControllerGetExpensesByUser");
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
    const responseFake = new ResponseFake();
    const useCaseMock = {
        getExpensesByUser: jest.fn().mockResolvedValue([
            { id: "1", userId: "123", description: "Aluguel", amount: 1500 },
        ]),
    };
    const repositoryMock = {
        findByUserId: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        findByCategory: jest.fn(),
        findByUserAndDate: jest.fn(),
    };
    const controller = new ExpenseControllerGetExpensesByUser_1.ExpenseControllerGetExpensesByUser(useCaseMock, repositoryMock);
    return { controller, responseFake, useCaseMock, repositoryMock };
};
describe("ExpenseControllerGetExpensesByUser", () => {
    it("Deve ser possível instanciar ExpenseControllerGetExpensesByUser", () => {
        const { controller } = makeSUT();
        expect(controller).toBeDefined();
    });
    it("Deve retornar status 400 se 'userId' estiver ausente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake } = makeSUT();
        yield controller.getExpensesByUser("", responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toEqual({
            message: "O ID do usuário é obrigatório.",
        });
    }));
    it("Deve chamar o caso de uso corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake, useCaseMock } = makeSUT();
        yield controller.getExpensesByUser("123", responseFake);
        expect(useCaseMock.getExpensesByUser).toHaveBeenCalledTimes(1);
        expect(useCaseMock.getExpensesByUser).toHaveBeenCalledWith("123");
    }));
    it("Deve retornar status 404 se nenhuma despesa for encontrada", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake, useCaseMock } = makeSUT();
        useCaseMock.getExpensesByUser.mockResolvedValue([]);
        yield controller.getExpensesByUser("123", responseFake);
        expect(responseFake.statusCode).toBe(404);
        expect(responseFake.jsonData).toEqual({ message: "Nenhuma despesa encontrada." });
    }));
    it("Deve retornar status 200 e uma lista de despesas", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake } = makeSUT();
        yield controller.getExpensesByUser("123", responseFake);
        expect(responseFake.statusCode).toBe(200);
        expect(responseFake.jsonData).toEqual({
            expenses: [{ id: "1", userId: "123", description: "Aluguel", amount: 1500 }],
        });
    }));
    it("Deve retornar status 500 se ocorrer um erro inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake, useCaseMock } = makeSUT();
        useCaseMock.getExpensesByUser.mockRejectedValue(new Error("Erro interno"));
        yield controller.getExpensesByUser("123", responseFake);
        expect(responseFake.statusCode).toBe(500);
        expect(responseFake.jsonData).toEqual({
            message: "Erro ao buscar despesas por usuário.",
            error: new Error("Erro interno"),
        });
    }));
});
