import { UserUseCaseRegister } from "../../../src/domain/usecase/User/UserUseCaseRegister";
import { IUserRepositoryInsert } from "../../../src/contract/repositories/IUserRepository";
import { IUser } from "../../../src/contract/entities/IUser";
import { AuthService } from "../../../src/domain/Auth/AuthService";
import bcrypt from "bcrypt";

const makeSUT = () => {
    const userRepositoryInsertMock: IUserRepositoryInsert<IUser> = {
        insert: jest.fn(),
        findByEmail: jest.fn()
    };

    const useCase = new UserUseCaseRegister(userRepositoryInsertMock);

    return { useCase, userRepositoryInsertMock };
};

describe("UserUseCaseRegister", () => {
    it("Deve ser possível instanciar UserUseCaseRegister", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });

    it("Deve registrar um usuário com sucesso", async () => {
        const { useCase, userRepositoryInsertMock } = makeSUT();

        const input = {
            name: "Vitor",
            email: "vitor@email.com",
            password: "securepass"
        };

        const hashedPassword = await bcrypt.hash(input.password, 10);
        const newUser = { id: "1", name: input.name, email: input.email, password: hashedPassword };
        
        (userRepositoryInsertMock.findByEmail as jest.Mock).mockResolvedValue(null);
        (userRepositoryInsertMock.insert as jest.Mock).mockResolvedValue(undefined);

        jest.spyOn(bcrypt, "hash").mockImplementation(() => Promise.resolve(hashedPassword));
        jest.spyOn(AuthService, "generateToken").mockReturnValue("mocked-token");


        const result = await useCase.register(input);

        expect(userRepositoryInsertMock.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepositoryInsertMock.findByEmail).toHaveBeenCalledWith(input.email);
        expect(bcrypt.hash).toHaveBeenCalledWith(input.password, 10);
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
    });

    it("Deve falhar ao tentar registrar sem todos os campos obrigatórios", async () => {
        const { useCase } = makeSUT();

        const inputs = [
            { name: "", email: "vitor@email.com", password: "12345" },
            { name: "Vitor", email: "", password: "12345" },
            { name: "Vitor", email: "vitor@email.com", password: "" }
        ];

        for (const input of inputs) {
            const result = await useCase.register(input);
            expect(result).toEqual({
                success: false,
                message: "All fields are required."
            });
        }
    });

    it("Deve falhar se o nome tiver menos de 4 caracteres", async () => {
        const { useCase } = makeSUT();

        const input = { name: "Vit", email: "vitor@email.com", password: "12345" };

        const result = await useCase.register(input);

        expect(result).toEqual({
            success: false,
            message: "Name must have at least 4 characters."
        });
    });

    it("Deve falhar se a senha tiver menos de 5 caracteres", async () => {
        const { useCase } = makeSUT();

        const input = { name: "Vitor", email: "vitor@email.com", password: "1234" };

        const result = await useCase.register(input);

        expect(result).toEqual({
            success: false,
            message: "Password must have at least 5 characters."
        });
    });

    it("Deve falhar se o email já estiver cadastrado", async () => {
        const { useCase, userRepositoryInsertMock } = makeSUT();

        const input = { name: "Vitor", email: "vitor@email.com", password: "securepass" };

        (userRepositoryInsertMock.findByEmail as jest.Mock).mockResolvedValue({
            id: "1",
            name: input.name,
            email: input.email,
            password: "hashedpass"
        });

        const result = await useCase.register(input);

        expect(userRepositoryInsertMock.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepositoryInsertMock.findByEmail).toHaveBeenCalledWith(input.email);
        expect(result).toEqual({
            success: false,
            message: "Email already registered."
        });
    });

    it("Deve capturar erros inesperados e não quebrar a aplicação", async () => {
        const { useCase, userRepositoryInsertMock } = makeSUT();

        const input = { name: "Vitor", email: "vitor@email.com", password: "securepass" };

        (userRepositoryInsertMock.findByEmail as jest.Mock).mockRejectedValue(new Error("Erro inesperado"));

        await expect(useCase.register(input)).rejects.toThrow("Erro inesperado");
    });
});
