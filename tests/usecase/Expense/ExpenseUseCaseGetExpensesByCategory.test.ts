import { ExpenseUseCaseGetExpensesByCategory } from "../../../src/domain/usecase/Expense/ExpenseUseCaseGetExpensesByCategory";
import { IExpenseRepositoryFind } from "../../../src/contract/repositories/IExpenseRepository";
import { IExpense } from "../../../src/contract/entities/IExpense";

const makeSUT = () => {
    const expenseRepositoryFindMock: IExpenseRepositoryFind<IExpense> = {
        findByCategory: jest.fn().mockResolvedValue([]),
        findByUserId: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        findByUserAndDate: jest.fn(),
    };

    const useCase = new ExpenseUseCaseGetExpensesByCategory(expenseRepositoryFindMock);

    return { useCase, expenseRepositoryFindMock };
}

describe("ExpenseUseCaseGetExpensesByCategory", () => {
    it("Deve ser possível instanciar ExpenseUseCaseGetExpensesByCategory", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });

    it("Deve buscar despesas por categoria com sucesso", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();

        const userId = "user123";
        const category = "Educação";

        const result = await useCase.getExpensesByCategory(userId, category);

        expect(expenseRepositoryFindMock.findByCategory).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryFindMock.findByCategory).toHaveBeenCalledWith(userId, category);
        expect(result).toEqual([]);
    });

    it("Deve retornar erro se 'userId' estiver ausente", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();

        const userId = "";
        const category = "Educação";

        await expect(useCase.getExpensesByCategory(userId, category)).rejects.toThrow("UserId é obrigatório");
    });

    it("Deve retornar erro se 'category' estiver ausente", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();

        const userId = "user123";
        const category = "";

        await expect(useCase.getExpensesByCategory(userId, category)).rejects.toThrow("Category é obrigatória");
    });

    it("Deve capturar erro inesperado e não quebrar a aplicação", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
        (expenseRepositoryFindMock.findByCategory as jest.Mock).mockRejectedValue(new Error("Erro no banco de dados"));

        const userId = "user123";
        const category = "Educação";

        await expect(useCase.getExpensesByCategory(userId, category)).rejects.toThrow("Erro no banco de dados");
    });
});