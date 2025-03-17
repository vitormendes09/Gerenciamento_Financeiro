process.env.SECRET = "test_secret"; 
import jwt from "jsonwebtoken";
import { AuthService } from "../../src/domain/Auth/AuthService";
import { IUser } from "../../src/contract/entities/IUser";

jest.mock("jsonwebtoken"); // Mockamos o jsonwebtoken para evitar dependência externa


const SECRET = process.env.SECRET as string;

const mockUser: IUser = {
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
            (jwt.sign as jest.Mock).mockReturnValue("mocked_token");

            const token = AuthService.generateToken(mockUser);

            expect(jwt.sign).toHaveBeenCalledTimes(1);
            expect(jwt.sign).toHaveBeenCalledWith({ user: mockUser }, SECRET, { expiresIn: "1d" });
            expect(token).toBe("mocked_token");
        });
    });

    describe("decodeToken", () => {
        it("Deve decodificar um token JWT válido e retornar o usuário", () => {
            (jwt.verify as jest.Mock).mockReturnValue({ user: mockUser });

            const decodedUser = AuthService.decodeToken("valid_token");

            expect(jwt.verify).toHaveBeenCalledTimes(1);
            expect(jwt.verify).toHaveBeenCalledWith("valid_token", SECRET);
            expect(decodedUser).toEqual(mockUser);
        });

        it("Deve retornar null ao tentar decodificar um token inválido", () => {
            (jwt.verify as jest.Mock).mockImplementation(() => {
                throw new Error("Invalid token");
            });

            const decodedUser = AuthService.decodeToken("invalid_token");

            expect(jwt.verify).toHaveBeenCalledTimes(1);
            expect(jwt.verify).toHaveBeenCalledWith("invalid_token", SECRET);
            expect(decodedUser).toBeNull();
        });
    });

    describe("verifyToken", () => {
        it("Deve lançar um erro se o método não estiver implementado", () => {
            expect(() => AuthService.verifyToken("some_token")).toThrow("Method not implemented.");
        });
    });
});
