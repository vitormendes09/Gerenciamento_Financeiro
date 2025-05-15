"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.SECRET = "test_secret";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthService_1 = require("../../src/domain/Auth/AuthService");
jest.mock("jsonwebtoken"); // Mockamos o jsonwebtoken para evitar dependência externa
const SECRET = process.env.SECRET;
const mockUser = {
    name: "Test User",
    email: "test@example.com",
    password: "hashedpassword",
};
describe("AuthService", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });
    describe("generateToken", () => {
        it("Deve gerar um token JWT válido", () => {
            jsonwebtoken_1.default.sign.mockReturnValue("mocked_token");
            const token = AuthService_1.AuthService.generateToken(mockUser);
            expect(jsonwebtoken_1.default.sign).toHaveBeenCalledTimes(1);
            expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith({ user: mockUser }, SECRET, { expiresIn: "1d" });
            expect(token).toBe("mocked_token");
        });
    });
    describe("decodeToken", () => {
        it("Deve decodificar um token JWT válido e retornar o usuário", () => {
            jsonwebtoken_1.default.verify.mockReturnValue({ user: mockUser });
            const decodedUser = AuthService_1.AuthService.decodeToken("valid_token");
            expect(jsonwebtoken_1.default.verify).toHaveBeenCalledTimes(1);
            expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith("valid_token", SECRET);
            expect(decodedUser).toEqual(mockUser);
        });
        it("Deve retornar null ao tentar decodificar um token inválido", () => {
            jsonwebtoken_1.default.verify.mockImplementation(() => {
                throw new Error("Invalid token");
            });
            const decodedUser = AuthService_1.AuthService.decodeToken("invalid_token");
            expect(jsonwebtoken_1.default.verify).toHaveBeenCalledTimes(1);
            expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith("invalid_token", SECRET);
            expect(decodedUser).toBeNull();
        });
    });
    describe("verifyToken", () => {
        it("Deve lançar um erro se o método não estiver implementado", () => {
            expect(() => AuthService_1.AuthService.verifyToken("some_token")).toThrow("Method not implemented.");
        });
    });
});
