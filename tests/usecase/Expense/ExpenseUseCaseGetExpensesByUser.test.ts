import { ExpenseUseCaseGetExpensesByUser } from "../../../src/domain/usecase/Expense/ExpenseUseCaseGetExpensesByUser";
import { IExpenseRepositoryFind } from "../../../src/contract/repositories/IExpenseRepository";
import { IExpense } from "../../../src/contract/entities/IExpense";

const makeSUT = () => {
    const expenseRepositoryFindMock: IExpenseRepositoryFind<IExpense> = {
        findByUserId: jest.fn().mockResolvedValue([]),
        findById: jest.fn(),
        findAll: jest.fn(),
        findByUserAndDate: jest.fn(),
        findByCategory: jest.fn(),
    };

    const useCase = new ExpenseUseCaseGetExpensesByUser(expenseRepositoryFindMock);

    return { useCase, expenseRepositoryFindMock };
};

describe("ExpenseUseCaseGetExpensesByUser", () => {
    it("Deve ser possível instanciar ExpenseUseCaseGetExpensesByUser", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });

    it("Deve buscar despesas por usuário com sucesso", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();

        const userId = "user123";

        const expenses = [
            {
                id: "expense1",
                iduser: userId,
                description: "Compra de livro",
                amount: 100,
                date: new Date(),
                category: "Educação",
                status: true
            },
            {
                id: "expense2",
                iduser: userId,
                description: "Compra de material",
                amount: 200,
                date: new Date(),
                category: "Educação",
                status: true
            }
        ];

        expenseRepositoryFindMock.findByUserId = jest.fn().mockResolvedValue(expenses);
        
        const result = await useCase.getExpensesByUser(userId);

        expect(expenseRepositoryFindMock.findByUserId).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryFindMock.findByUserId).toHaveBeenCalledWith(userId);
        expect(result).toEqual(expenses);
    });

    it("Deve retornar uma lista vazia se não encontrar despesas para o usuário", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();

        const userId = "user123";

        (expenseRepositoryFindMock.findByUserId as jest.Mock).mockResolvedValue([]);

        const result = await useCase.getExpensesByUser(userId);

        expect(expenseRepositoryFindMock.findByUserId).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryFindMock.findByUserId).toHaveBeenCalledWith(userId);
        expect(result).toEqual([]);
    });

    it("Deve retornar uma lista vazia se o usuário não tiver despesas", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();

        const userId = "user123";

        const expenses = [
            {
                id: "expense1",
                iduser: "outroUser",
                description: "Compra de livro",
                amount: 100,
                date: new Date(),
                category: "Educação",
                status: true
            },
            {
                id: "expense2",
                iduser: "outroUser",
                description: "Compra de material",
                amount: 200,
                date: new Date(),
                category: "Educação",
                status: true
            }
        ];

        expenseRepositoryFindMock.findByUserId = jest.fn().mockResolvedValue(expenses);
        const result = await useCase.getExpensesByUser(userId);

        expect(expenseRepositoryFindMock.findByUserId).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryFindMock.findByUserId).toHaveBeenCalledWith(userId);
        expect(result).toEqual([]);
    });

    it("Deve lançar um erro se o usuário for inválido", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();

        const userId = "";

        await expect(useCase.getExpensesByUser(userId)).rejects.toThrow("UserId é obrigatório");
    });

    it("Deve capturar erro inesperado e não quebrar a aplicação", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        (expenseRepositoryFindMock.findByUserId as jest.Mock).mockRejectedValue(new Error("Erro no banco de dados"));

        const userId = "user123";

        await expect(useCase.getExpensesByUser(userId)).rejects.toThrow("Erro no banco de dados");
    });
});