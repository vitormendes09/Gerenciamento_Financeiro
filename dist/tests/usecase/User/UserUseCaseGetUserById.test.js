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
const UserUseCaseGetUserById_1 = require("../../../src/domain/usecase/User/UserUseCaseGetUserById");
const makeSUT = () => {
    const userRepositoryFindMock = {
        findById: jest.fn(),
        findAll: jest.fn(),
        findByEmail: jest.fn(),
        findByUsername: jest.fn(),
    };
    const useCase = new UserUseCaseGetUserById_1.UserUseCaseGetUserById(userRepositoryFindMock);
    return { useCase, userRepositoryFindMock };
};
describe("UserUseCaseGetUserById", () => {
    it("Deve ser possível instanciar UserUseCaseGetUserById", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });
    it("Deve retornar erro se o ID não for informado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase } = makeSUT();
        const result = yield useCase.getUserById("");
        expect(result).toEqual({
            success: false,
            message: "Id is required",
        });
    }));
    it("Deve retornar erro se o usuário não for encontrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, userRepositoryFindMock } = makeSUT();
        userRepositoryFindMock.findById.mockResolvedValue(null);
        const result = yield useCase.getUserById("invalid_id");
        expect(userRepositoryFindMock.findById).toHaveBeenCalledTimes(1);
        expect(userRepositoryFindMock.findById).toHaveBeenCalledWith("invalid_id");
        expect(result).toEqual({
            success: false,
            message: "User not found",
        });
    }));
    it("Deve retornar sucesso e os dados do usuário se ele for encontrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, userRepositoryFindMock } = makeSUT();
        const mockUser = {
            id: "user123",
            name: "John Doe",
            email: "john@example.com",
            password: "hashedpassword"
        };
        userRepositoryFindMock.findById.mockResolvedValue(mockUser);
        const result = yield useCase.getUserById("user123");
        expect(userRepositoryFindMock.findById).toHaveBeenCalledTimes(1);
        expect(userRepositoryFindMock.findById).toHaveBeenCalledWith("user123");
        expect(result).toEqual({
            success: true,
            message: "User found",
            user: mockUser,
        });
    }));
    it("Deve capturar erros inesperados e não quebrar a aplicação", () => __awaiter(void 0, void 0, void 0, function* () {
        const { useCase, userRepositoryFindMock } = makeSUT();
        userRepositoryFindMock.findById.mockRejectedValue(new Error("Erro no banco de dados"));
        yield expect(useCase.getUserById("user123")).rejects.toThrow("Erro no banco de dados");
    }));
});
