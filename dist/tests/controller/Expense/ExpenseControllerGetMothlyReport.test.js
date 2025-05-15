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
const ExpenseControllerGetMothlyReport_1 = require("../../../src/controller/Expense/ExpenseControllerGetMothlyReport");
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
        params: { userId: "123", month: "2", year: "2025" },
    };
    const responseFake = new ResponseFake();
    const useCaseMock = {
        getMonthlyReport: jest.fn().mockResolvedValue([
            { description: "Aluguel", amount: 1500, category: "Moradia" },
        ]),
    };
    const repositoryMock = {
        findByUserId: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        findByCategory: jest.fn(),
        findByUserAndDate: jest.fn(),
    };
    const controller = new ExpenseControllerGetMothlyReport_1.ExpenseControllerGetMothlyReport(useCaseMock, repositoryMock);
    return { controller, requestStub, responseFake, useCaseMock };
};
describe("ExpenseControllerGetMonthlyReport", () => {
    it("Deve ser possível instanciar ExpenseControllerGetMonthlyReport", () => {
        const { controller } = makeSUT();
        expect(controller).toBeDefined();
    });
    it("Deve chamar o caso de uso corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        yield controller.getMonthlyReport(requestStub, responseFake);
        expect(useCaseMock.getMonthlyReport).toHaveBeenCalledTimes(1);
        expect(useCaseMock.getMonthlyReport).toHaveBeenCalledWith(requestStub.params.userId, 2, 2025);
    }));
    it("Deve retornar status 200 e o relatório gerado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake } = makeSUT();
        yield controller.getMonthlyReport(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(200);
        expect(responseFake.jsonData).toEqual({
            report: [{ description: "Aluguel", amount: 1500, category: "Moradia" }],
        });
    }));
    it("Deve retornar status 500 se ocorrer um erro inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.getMonthlyReport.mockRejectedValue(new Error("Erro ao gerar relatório"));
        yield controller.getMonthlyReport(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(500);
        expect(responseFake.jsonData).toEqual({
            message: "Erro ao gerar relatório mensal.",
            error: new Error("Erro ao gerar relatório"),
        });
    }));
});
