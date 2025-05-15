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
const UserControllerLogin_1 = require("../../../src/controller/User/UserControllerLogin");
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
        body: { email: "test@example.com", password: "password123" },
    };
    const responseFake = new ResponseFake();
    const useCaseMock = {
        login: jest.fn().mockResolvedValue({
            success: true,
            message: "Login bem-sucedido.",
            token: "token123",
        }),
    };
    const controller = new UserControllerLogin_1.UserControllerLogin(useCaseMock);
    return { controller, requestStub, responseFake, useCaseMock };
};
describe("UserControllerLogin", () => {
    it("Deve ser possível instanciar UserControllerLogin", () => {
        const { controller } = makeSUT();
        expect(controller).toBeDefined();
    });
    it("Deve chamar o caso de uso de login corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        yield controller.login(requestStub, responseFake);
        expect(useCaseMock.login).toHaveBeenCalledTimes(1);
        expect(useCaseMock.login).toHaveBeenCalledWith("test@example.com", "password123");
    }));
    it("Deve retornar status 200 e um token se o login for bem-sucedido", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake } = makeSUT();
        yield controller.login(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(200);
        expect(responseFake.jsonData).toEqual({
            message: "Login bem-sucedido.",
            token: "token123",
        });
    }));
    it("Deve retornar status 400 se o login falhar", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.login.mockResolvedValue({
            success: false,
            message: "Credenciais inválidas.",
            token: "",
        });
        yield controller.login(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toEqual({
            message: "Credenciais inválidas.",
        });
    }));
    it("Deve retornar status 400 se a validação falhar", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake } = makeSUT();
        const requestStub = { body: { email: "invalidemail", password: "password123" } };
        yield controller.login(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toEqual({
            message: "Erro de validação",
            errors: expect.any(Array),
        });
    }));
    it("Deve retornar status 500 se ocorrer um erro inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.login.mockRejectedValue(new Error("Erro interno"));
        yield controller.login(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(500);
        expect(responseFake.jsonData).toEqual({
            message: "Erro interno no servidor.",
        });
    }));
});
