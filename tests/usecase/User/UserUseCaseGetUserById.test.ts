import { UserUseCaseGetUserById } from "../../../src/domain/usecase/User/UserUseCaseGetUserById";
import { IUserRepositoryFind } from "../../../src/contract/repositories/IUserRepository";
import { IUser } from "../../../src/contract/entities/IUser";

const makeSUT = () => {
    const userRepositoryFindMock: IUserRepositoryFind<IUser> = {
        findById: jest.fn(),
        findAll: jest.fn(),
        findByEmail: jest.fn(),
        findByUsername: jest.fn(),
    } as IUserRepositoryFind<IUser>;

    const useCase = new UserUseCaseGetUserById(userRepositoryFindMock);

    return { useCase, userRepositoryFindMock };
};

describe("UserUseCaseGetUserById", () => {
    it("Deve ser possível instanciar UserUseCaseGetUserById", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });

    it("Deve retornar erro se o ID não for informado", async () => {
        const { useCase } = makeSUT();

        const result = await useCase.getUserById("");

        expect(result).toEqual({
            success: false,
            message: "Id is required",
        });
    });

    it("Deve retornar erro se o usuário não for encontrado", async () => {
        const { useCase, userRepositoryFindMock } = makeSUT();

        (userRepositoryFindMock.findById as jest.Mock).mockResolvedValue(null);

        const result = await useCase.getUserById("invalid_id");

        expect(userRepositoryFindMock.findById).toHaveBeenCalledTimes(1);
        expect(userRepositoryFindMock.findById).toHaveBeenCalledWith("invalid_id");
        expect(result).toEqual({
            success: false,
            message: "User not found",
        });
    });

    it("Deve retornar sucesso e os dados do usuário se ele for encontrado", async () => {
        const { useCase, userRepositoryFindMock } = makeSUT();

        const mockUser: IUser = {
            id: "user123",
            name: "John Doe",
            email: "john@example.com",
            password: "hashedpassword"
        };

        (userRepositoryFindMock.findById as jest.Mock).mockResolvedValue(mockUser);

        const result = await useCase.getUserById("user123");

        expect(userRepositoryFindMock.findById).toHaveBeenCalledTimes(1);
        expect(userRepositoryFindMock.findById).toHaveBeenCalledWith("user123");
        expect(result).toEqual({
            success: true,
            message: "User found",
            user: mockUser,
        });
    });

    it("Deve capturar erros inesperados e não quebrar a aplicação", async () => {
        const { useCase, userRepositoryFindMock } = makeSUT();

        (userRepositoryFindMock.findById as jest.Mock).mockRejectedValue(new Error("Erro no banco de dados"));

        await expect(useCase.getUserById("user123")).rejects.toThrow("Erro no banco de dados");
    });
});
