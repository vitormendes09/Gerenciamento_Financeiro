import { UserUseCaseLogin } from "../../../src/domain/usecase/User/UserUseCaseLogin";
import { IUserRepositoryFind } from "../../../src/contract/repositories/IUserRepository";
import { IUser } from "../../../src/contract/entities/IUser";
import bcrypt from "bcrypt";
import { AuthService } from "../../../src/domain/Auth/AuthService";

jest.mock("bcrypt");
jest.mock("../../../src/domain/Auth/AuthService");

const makeSUT = () => {
    const userRepositoryFindMock: IUserRepositoryFind<IUser> = {
        findById: jest.fn(),
        findByEmail: jest.fn()
    };

    const useCase = new UserUseCaseLogin(userRepositoryFindMock);

    return { useCase, userRepositoryFindMock };
};

describe("UserUseCaseLogin", () => {
    it("Deve ser possível instanciar UserUseCaseLogin", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });

    it("Deve retornar erro se a senha não for informada", async () => {
        const { useCase } = makeSUT();

        const email = "test@example.com";
        const password = "";

        const result = await useCase.login(email, password);

        expect(result).toEqual({
            success: false,
            message: "Password are required"
        });
    });

    it("Deve retornar erro se o usuário não for encontrado", async () => {
        const { useCase, userRepositoryFindMock } = makeSUT();

        const email = "test@example.com";
        const password = "password123";

        (userRepositoryFindMock.findByEmail as jest.Mock).mockResolvedValue(null);

        const result = await useCase.login(email, password);

        expect(userRepositoryFindMock.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepositoryFindMock.findByEmail).toHaveBeenCalledWith(email);
        expect(result).toEqual({
            success: false,
            message: "User not found"
        });
    });

    it("Deve retornar erro se a senha estiver incorreta", async () => {
        const { useCase, userRepositoryFindMock } = makeSUT();

        const email = "test@example.com";
        const password = "password123";

        const user: IUser = {
            id: "user123",
            email: email,
            password: "hashedpassword",
            name: "Test User"
        };

        (userRepositoryFindMock.findByEmail as jest.Mock).mockResolvedValue(user);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        const result = await useCase.login(email, password);

        expect(userRepositoryFindMock.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepositoryFindMock.findByEmail).toHaveBeenCalledWith(email);
        expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
        expect(result).toEqual({
            success: false,
            message: "Password is incorrect"
        });
    });

    it("Deve retornar sucesso ao fazer login corretamente", async () => {
        const { useCase, userRepositoryFindMock } = makeSUT();

        const email = "test@example.com";
        const password = "password123";

        const user: IUser = {
            id: "user123",
            email: email,
            password: "hashedpassword",
            name: "Test User"
        };

        const token = "valid_token";

        (userRepositoryFindMock.findByEmail as jest.Mock).mockResolvedValue(user);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (AuthService.generateToken as jest.Mock).mockReturnValue(token);

        const result = await useCase.login(email, password);

        expect(userRepositoryFindMock.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepositoryFindMock.findByEmail).toHaveBeenCalledWith(email);
        expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
        expect(AuthService.generateToken).toHaveBeenCalledWith(user);
        expect(result).toEqual({
            success: true,
            message: "User logged in",
            user: user,
            token: token
        });
    });

    it("Deve capturar erro inesperado e não quebrar a aplicação", async () => {
        const { useCase, userRepositoryFindMock } = makeSUT();

        const email = "test@example.com";
        const password = "password123";

        (userRepositoryFindMock.findByEmail as jest.Mock).mockRejectedValue(new Error("Erro no banco de dados"));

        await expect(useCase.login(email, password)).rejects.toThrow("Erro no banco de dados");
    });
});
