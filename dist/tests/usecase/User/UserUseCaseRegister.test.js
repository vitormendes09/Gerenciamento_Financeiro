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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserUseCaseRegister_1 = require("../../../src/domain/usecase/User/UserUseCaseRegister");
const AuthService_1 = require("../../../src/domain/Auth/AuthService");
const bcrypt_1 = __importDefault(require("bcrypt"));
const makeSUT = () => {
    const userRepositoryInsertMock = {
        insert: jest.fn(),
        findByEmail: jest.fn()
    };
    const useCase = new UserUseCaseRegister_1.UserUseCaseRegister(userRepositoryInsertMock);
    return { useCase, userRepositoryInsertMock };
};
describe("UserUseCaseRegister", () => {
    it("Deve ser possível instanciar UserUseCaseRegister", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });
    it("Deve registrar um usuário com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, userRepositoryInsertMock } = makeSUT();
        const input = {
            name: "Vitor",
            email: "vitor@email.com",
            password: "securepass"
        };
        const hashedPassword = yield bcrypt_1.default.hash(input.password, 10);
        const newUser = { id: "1", name: input.name, email: input.email, password: hashedPassword };
        userRepositoryInsertMock.findByEmail.mockResolvedValue(null);
        userRepositoryInsertMock.insert.mockResolvedValue(undefined);
        jest.spyOn(bcrypt_1.default, "hash").mockImplementation(() => Promise.resolve(hashedPassword));
        jest.spyOn(AuthService_1.AuthService, "generateToken").mockReturnValue("mocked-token");
        const result = yield useCase.register(input);
        expect(userRepositoryInsertMock.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepositoryInsertMock.findByEmail).toHaveBeenCalledWith(input.email);
        expect(bcrypt_1.default.hash).toHaveBeenCalledWith(input.password, 10);
        expect(userRepositoryInsertMock.insert).toHaveBeenCalledTimes(1);
        expect(userRepositoryInsertMock.insert).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
            name: input.name,
            email: input.email,
            password: hashedPassword
        }));
        expect(result).toEqual({
            success: true,
            message: "User registered successfully.",
            user: expect.objectContaining({ name: input.name, email: input.email }),
            token: "mocked-token"
        });
    }));
    it("Deve falhar ao tentar registrar sem todos os campos obrigatórios", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase } = makeSUT();
        const inputs = [
            { name: "", email: "vitor@email.com", password: "12345" },
            { name: "Vitor", email: "", password: "12345" },
            { name: "Vitor", email: "vitor@email.com", password: "" }
        ];
        for (const input of inputs) {
            const result = yield useCase.register(input);
            expect(result).toEqual({
                success: false,
                message: "All fields are required."
            });
        }
    }));
    it("Deve falhar se o nome tiver menos de 4 caracteres", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase } = makeSUT();
        const input = { name: "Vit", email: "vitor@email.com", password: "12345" };
        const result = yield useCase.register(input);
        expect(result).toEqual({
            success: false,
            message: "Name must have at least 4 characters."
        });
    }));
    it("Deve falhar se a senha tiver menos de 5 caracteres", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase } = makeSUT();
        const input = { name: "Vitor", email: "vitor@email.com", password: "1234" };
        const result = yield useCase.register(input);
        expect(result).toEqual({
            success: false,
            message: "Password must have at least 5 characters."
        });
    }));
    it("Deve falhar se o email já estiver cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, userRepositoryInsertMock } = makeSUT();
        const input = { name: "Vitor", email: "vitor@email.com", password: "securepass" };
        userRepositoryInsertMock.findByEmail.mockResolvedValue({
            id: "1",
            name: input.name,
            email: input.email,
            password: "hashedpass"
        });
        const result = yield useCase.register(input);
        expect(userRepositoryInsertMock.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepositoryInsertMock.findByEmail).toHaveBeenCalledWith(input.email);
        expect(result).toEqual({
            success: false,
            message: "Email already registered."
        });
    }));
    it("Deve capturar erros inesperados e não quebrar a aplicação", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, userRepositoryInsertMock } = makeSUT();
        const input = { name: "Vitor", email: "vitor@email.com", password: "securepass" };
        userRepositoryInsertMock.findByEmail.mockRejectedValue(new Error("Erro inesperado"));
        yield expect(useCase.register(input)).rejects.toThrow("Erro inesperado");
    }));
});
