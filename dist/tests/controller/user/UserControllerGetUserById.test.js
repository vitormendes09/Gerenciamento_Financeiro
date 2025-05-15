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
const UserControllerGetUserById_1 = require("../../../src/controller/User/UserControllerGetUserById");
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
        getUserById: jest.fn().mockResolvedValue({ id: "123", name: "John Doe" }),
    };
    const controller = new UserControllerGetUserById_1.UserControllerGetUserById(useCaseMock);
    return { controller, requestStub, responseFake, useCaseMock };
};
describe("UserControllerGetUserById", () => {
    it("Deve ser possível instanciar UserControllerGetUserById", () => {
        const { controller } = makeSUT();
        expect(controller).toBeDefined();
    });
    it("Deve chamar o caso de uso corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        yield controller.getUserById(requestStub, responseFake);
        expect(useCaseMock.getUserById).toHaveBeenCalledTimes(1);
        expect(useCaseMock.getUserById).toHaveBeenCalledWith("123");
    }));
    it("Deve retornar status 200 e os dados do usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake } = makeSUT();
        yield controller.getUserById(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(200);
        expect(responseFake.jsonData).toEqual({
            id: "123",
            name: "John Doe",
        });
    }));
    it("Deve retornar status 404 se o usuário não for encontrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.getUserById.mockResolvedValue(null);
        yield controller.getUserById(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(404);
        expect(responseFake.jsonData).toEqual({
            message: "Usuário não encontrado.",
        });
    }));
    it("Deve retornar status 500 se ocorrer um erro inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.getUserById.mockRejectedValue(new Error("Erro interno"));
        yield controller.getUserById(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(500);
        expect(responseFake.jsonData).toEqual({
            message: "Erro interno no servidor",
        });
    }));
});
