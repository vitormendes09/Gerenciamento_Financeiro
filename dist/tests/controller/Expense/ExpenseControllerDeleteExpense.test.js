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
const ExpenseControllerDeleteExpense_1 = require("../../../src/controller/Expense/ExpenseControllerDeleteExpense");
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
        params: { id: "123" },
    };
    const responseFake = new ResponseFake();
    const useCaseMock = {
        deleteExpense: jest.fn().mockResolvedValue({
            success: true,
            message: "Despesa excluída com sucesso.",
        }),
    };
    const repositoryMock = {
        delete: jest.fn(),
        findById: jest.fn(),
    };
    const controller = new ExpenseControllerDeleteExpense_1.ExpenseControllerDeleteExpense(useCaseMock, repositoryMock);
    return { controller, requestStub, responseFake, useCaseMock };
};
describe("ExpenseControllerDeleteExpense", () => {
    it("Deve ser possível instanciar ExpenseControllerDeleteExpense", () => {
        const { controller } = makeSUT();
        expect(controller).toBeDefined();
    });
    it("Deve chamar o caso de uso corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        yield controller.deleteExpense(requestStub, responseFake);
        expect(useCaseMock.deleteExpense).toHaveBeenCalledTimes(1);
        expect(useCaseMock.deleteExpense).toHaveBeenCalledWith("123");
    }));
    it("Deve retornar status 200 e mensagem de sucesso ao deletar uma despesa", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake } = makeSUT();
        yield controller.deleteExpense(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(200);
        expect(responseFake.jsonData).toEqual({ message: "Despesa excluída com sucesso." });
    }));
    it("Deve retornar status 400 se a despesa não for encontrada", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.deleteExpense.mockResolvedValue({
            success: false,
            message: "Despesa não encontrada.",
        });
        yield controller.deleteExpense(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toEqual({ message: "Despesa não encontrada." });
    }));
    it("Deve retornar status 500 em caso de erro inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.deleteExpense.mockRejectedValue(new Error("Erro desconhecido"));
        yield controller.deleteExpense(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(500);
        expect(responseFake.jsonData).toEqual({ message: "Erro interno no servidor." });
    }));
});
