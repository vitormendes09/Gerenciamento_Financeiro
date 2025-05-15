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
const UserUseCaseLogin_1 = require("../../../src/domain/usecase/User/UserUseCaseLogin");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthService_1 = require("../../../src/domain/Auth/AuthService");
jest.mock("bcrypt");
jest.mock("../../../src/domain/Auth/AuthService");
const makeSUT = () => {
    const userRepositoryFindMock = {
        findById: jest.fn(),
        findByEmail: jest.fn()
    };
    const useCase = new UserUseCaseLogin_1.UserUseCaseLogin(userRepositoryFindMock);
    return { useCase, userRepositoryFindMock };
};
describe("UserUseCaseLogin", () => {
    it("Deve ser possível instanciar UserUseCaseLogin", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });
    it("Deve retornar erro se a senha não for informada", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase } = makeSUT();
        const email = "test@example.com";
        const password = "";
        const result = yield useCase.login(email, password);
        expect(result).toEqual({
            success: false,
            message: "Password are required"
        });
    }));
    it("Deve retornar erro se o usuário não for encontrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, userRepositoryFindMock } = makeSUT();
        const email = "test@example.com";
        const password = "password123";
        userRepositoryFindMock.findByEmail.mockResolvedValue(null);
        const result = yield useCase.login(email, password);
        expect(userRepositoryFindMock.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepositoryFindMock.findByEmail).toHaveBeenCalledWith(email);
        expect(result).toEqual({
            success: false,
            message: "User not found"
        });
    }));
    it("Deve retornar erro se a senha estiver incorreta", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, userRepositoryFindMock } = makeSUT();
        const email = "test@example.com";
        const password = "password123";
        const user = {
            id: "user123",
            email: email,
            password: "hashedpassword",
            name: "Test User"
        };
        userRepositoryFindMock.findByEmail.mockResolvedValue(user);
        bcrypt_1.default.compare.mockResolvedValue(false);
        const result = yield useCase.login(email, password);
        expect(userRepositoryFindMock.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepositoryFindMock.findByEmail).toHaveBeenCalledWith(email);
        expect(bcrypt_1.default.compare).toHaveBeenCalledWith(password, user.password);
        expect(result).toEqual({
            success: false,
            message: "Password is incorrect"
        });
    }));
    it("Deve retornar sucesso ao fazer login corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, userRepositoryFindMock } = makeSUT();
        const email = "test@example.com";
        const password = "password123";
        const user = {
            id: "user123",
            email: email,
            password: "hashedpassword",
            name: "Test User"
        };
        const token = "valid_token";
        userRepositoryFindMock.findByEmail.mockResolvedValue(user);
        bcrypt_1.default.compare.mockResolvedValue(true);
        AuthService_1.AuthService.generateToken.mockReturnValue(token);
        const result = yield useCase.login(email, password);
        expect(userRepositoryFindMock.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepositoryFindMock.findByEmail).toHaveBeenCalledWith(email);
        expect(bcrypt_1.default.compare).toHaveBeenCalledWith(password, user.password);
        expect(AuthService_1.AuthService.generateToken).toHaveBeenCalledWith(user);
        expect(result).toEqual({
            success: true,
            message: "User logged in",
            user: user,
            token: token
        });
    }));
    it("Deve capturar erro inesperado e não quebrar a aplicação", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, userRepositoryFindMock } = makeSUT();
        const email = "test@example.com";
        const password = "password123";
        userRepositoryFindMock.findByEmail.mockRejectedValue(new Error("Erro no banco de dados"));
        yield expect(useCase.login(email, password)).rejects.toThrow("Erro no banco de dados");
    }));
});
