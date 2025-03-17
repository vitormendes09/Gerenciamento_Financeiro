import { ExpenseUseCaseDeleteExpense } from "../../../src/domain/usecase/Expense/ExpenseUseCaseDeleteExpense";
import { IExpenseRepositoryDelete, IExpenseRepositoryFind } from "../../../src/contract/repositories/IExpenseRepository";
import { IExpense } from "../../../src/contract/entities/IExpense";

const makeSUT = () => {
    const expenseRepositoryFindMock: IExpenseRepositoryFind<IExpense> = {
        findById: jest.fn().mockResolvedValue({
            iduser: "user123",
            description: "Compra de material",
            amount: 100.5,
            date: new Date(),
            category: "Educação",
            status: true
        }),
        findAll: jest.fn(), 
        findByCategory: jest.fn(),
        findByUserId: jest.fn(),
        findByUserAndDate: jest.fn()
    };

    const expenseRepositoryDeleteMock: IExpenseRepositoryDelete<IExpense> = {
        delete: jest.fn().mockReturnValue(Promise.resolve(true)),
        findById: jest.fn()
      };

    const useCase = new ExpenseUseCaseDeleteExpense(expenseRepositoryDeleteMock, expenseRepositoryFindMock);

    return { useCase, expenseRepositoryDeleteMock, expenseRepositoryFindMock };
};

describe("ExpenseUseCaseDeleteExpense", () => {
    it("Deve ser possível instanciar ExpenseUseCaseDeleteExpense", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });
    const expenseId = "expense123";

    it("Deve deletar uma despesa com sucesso", async () => {
        const { useCase, expenseRepositoryDeleteMock, expenseRepositoryFindMock } = makeSUT();

        const expenseId = "expense123";

        const result = await useCase.deleteExpense(expenseId);

        expect(expenseRepositoryFindMock.findById).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryFindMock.findById).toHaveBeenCalledWith(expenseId);
        expect(expenseRepositoryDeleteMock.delete).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryDeleteMock.delete).toHaveBeenCalledWith(expenseId);
        expect(result).toEqual({
            success: true,
            message: "Despesa deletada com sucesso."
        });
    });

    it("Deve retornar erro se a despesa não for encontrada", async () => {
        const { useCase, expenseRepositoryFindMock, expenseRepositoryDeleteMock } = makeSUT();
    
        const expenseId = "expense123";
    
        // Simulando que a despesa não foi encontrada
        (expenseRepositoryFindMock.findById as jest.Mock).mockResolvedValue(null);
    
        const result = await useCase.deleteExpense(expenseId);
    
        expect(expenseRepositoryFindMock.findById).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryFindMock.findById).toHaveBeenCalledWith(expenseId);
        expect(expenseRepositoryDeleteMock.delete).not.toHaveBeenCalled(); // Alterado aqui
        expect(result).toEqual({
            success: false,
            message: "Despesa não encontrada."
        });
    });
    
});
