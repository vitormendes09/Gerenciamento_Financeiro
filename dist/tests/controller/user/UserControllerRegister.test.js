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
const UserControllerRegister_1 = require("../../../src/controller/User/UserControllerRegister");
class ResponseFake {
    status(statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    json(obj) {
        this.jsonData = obj;
        return this;
    }
}
const makeSUT = () => {
    const requestStub = {
        body: {
            name: "João Silva",
            email: "joao@example.com",
            password: "senha123",
            confirmPassword: "senha123"
        }
    };
    const responseFake = new ResponseFake();
    const useCaseMock = {
        register: jest.fn().mockResolvedValue({ success: true, message: "Usuário registrado com sucesso!" }),
    };
    const controller = new UserControllerRegister_1.UserControllerRegister(useCaseMock);
    return { controller, requestStub, responseFake, useCaseMock };
};
describe("UserControllerRegister", () => {
    it("Deve ser possível instanciar UserControllerRegister", () => {
        const { controller } = makeSUT();
        expect(controller).toBeDefined();
    });
    it("Deve chamar o caso de uso corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        yield controller.register(requestStub, responseFake);
        expect(useCaseMock.register).toHaveBeenCalledTimes(1);
        expect(useCaseMock.register).toHaveBeenCalledWith({
            name: "João Silva",
            email: "joao@example.com",
            password: "senha123"
        });
    }));
    it("Deve retornar status 201 e mensagem de sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake } = makeSUT();
        yield controller.register(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(201);
        expect(responseFake.jsonData).toEqual({ message: "Usuário registrado com sucesso!" });
    }));
    it("Deve retornar status 400 se as senhas não coincidirem", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake } = makeSUT();
        const requestStub = { body: { name: "João", email: "joao@example.com", password: "senha123", confirmPassword: "senha456" } };
        yield controller.register(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toHaveProperty("message", "Erro de validação");
        expect(responseFake.jsonData.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ message: "As senhas não coincidem." })
        ]));
    }));
    it("Deve retornar status 400 se a validação de dados falhar", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake } = makeSUT();
        const requestStub = { body: { name: "Jo", email: "invalidemail", password: "123", confirmPassword: "123" } };
        yield controller.register(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toHaveProperty("message", "Erro de validação");
        expect(responseFake.jsonData.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ message: "O nome deve ter no mínimo 4 caracteres." }),
            expect.objectContaining({ message: "E-mail inválido." }),
            expect.objectContaining({ message: "A senha deve ter no mínimo 5 caracteres." })
        ]));
    }));
    it("Deve retornar status 500 se ocorrer um erro inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.register.mockRejectedValue(new Error("Erro interno"));
        yield controller.register(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(500);
        expect(responseFake.jsonData).toEqual({ message: "Erro interno no servidor." });
    }));
    it("Deve capturar e tratar erros inesperados que não sejam do Zod", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.register.mockRejectedValue(new Error("Erro desconhecido"));
        yield controller.register(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(500);
        expect(responseFake.jsonData).toEqual({ message: "Erro interno no servidor." });
    }));
    it("Deve capturar um ZodError corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, responseFake } = makeSUT();
        const requestStub = { body: {} };
        yield controller.register(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toHaveProperty("message", "Erro de validação");
        expect(responseFake.jsonData.errors).toBeInstanceOf(Array);
    }));
    it("Deve retornar status 400 se o caso de uso falhar", () => __awaiter(void 0, void 0, void 0, function* () {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        useCaseMock.register.mockResolvedValue({
            success: false,
            message: "Erro ao criar usuário"
        });
        yield controller.register(requestStub, responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect(responseFake.jsonData).toEqual({ message: "Erro ao criar usuário" });
    }));
});
