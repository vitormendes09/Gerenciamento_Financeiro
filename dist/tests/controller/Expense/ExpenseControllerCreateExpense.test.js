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
const ExpenseControllerCreateExpense_1 = require("../../../src/controller/Expense/ExpenseControllerCreateExpense");
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
        body: { userId: "123", description: "Aluguel", amount: 1500 },
    };
    const responseFake = new ResponseFake();
    const useCaseMock = {
        createExpense: jest.fn().mockResolvedValue({
            success: true,
            message: "Despesa criada com sucesso.",
        }),
    };
    const controller = new ExpenseControllerCreateExpense_1.ExpenseControllerCreateExpense(useCaseMock);
    return { controller, requestStub, responseFake, useCaseMock };
};
describe("ExpenseControllerCreateExpense", () => {
    it("Deve ser possível instanciar ExpenseControllerCreateExpense", () => {
        const { controller } = makeSUT();
        expect(controller).toBeDefined();
    });
    it("Deve chamar o caso de uso corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        yield controller.createExpense(requestStub, responseFake);
        // O mock foi chamado 1 vez
        expect(useCaseMock.createExpense).toHaveBeenCalledTimes(1);
        // O argumento passado para a função foi o requestStub.body
        expect(useCaseMock.createExpense).toHaveBeenCalledWith({
            iduser: requestStub.body.userId,
            description: requestStub.body.description,
            amount: requestStub.body.amount,
            date: undefined,
            category: undefined,
            status: "active",
        });
    }));
    it("Deve retornar status 201 e a despesa criada", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        yield controller.createExpense(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(201);
        expect(responseFake.jsonData).toEqual({
            message: "Despesa criada com sucesso.",
        });
    }));
    it("Deve retornar status 400 se 'description' ou 'amount' estiverem ausentes", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake } = makeSUT();
        const requestStub = { body: { userId: "123" } };
        yield controller.createExpense(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toEqual({
            message: "Os campos 'description' e 'amount' são obrigatórios.",
        });
    }));
    it("Deve retornar status 400 se 'userId' estiver ausente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake } = makeSUT();
        const requestStub = { body: { description: "Aluguel", amount: 1500 } };
        yield controller.createExpense(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toEqual({
            message: "O ID do usuário é obrigatório.",
        });
    }));
    it("Deve retornar status 400 se o caso de uso lançar o erro 'Erro ao criar despesa'", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.createExpense.mockRejectedValue(new Error("Erro ao criar despesa"));
        yield controller.createExpense(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toEqual({
            message: "Erro ao criar despesa",
        });
    }));
    it("Deve retornar status 400 se o caso de uso lançar um erro esperado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake } = makeSUT();
        const requestStub = { body: { userId: "123" } };
        yield controller.createExpense(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toEqual({
            message: "Os campos 'description' e 'amount' são obrigatórios.", // ❌ ERRO AQUI
        });
    }));
    it("Deve retornar status 500 se ocorrer um erro inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.createExpense.mockRejectedValue(new Error("Erro desconhecido"));
        yield controller.createExpense(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(500);
        expect(responseFake.jsonData).toEqual({
            message: "Erro interno do servidor",
        });
    }));
});
