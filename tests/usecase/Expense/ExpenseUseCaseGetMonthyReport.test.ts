import { ExpenseUseCaseGetMonthlyReport } from "../../../src/domain/usecase/Expense/ExpenseUseCaseGetMonthlyReport";
import { IExpenseRepositoryFind } from "../../../src/contract/repositories/IExpenseRepository";
import { IExpense } from "../../../src/contract/entities/IExpense";

const makeSUT = () => {
    const expenseRepositoryFindMock: IExpenseRepositoryFind<IExpense> = {
        findByUserId: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn().mockResolvedValue([]),
        findByUserAndDate: jest.fn(),
        findByCategory: jest.fn(),
    };

    const useCase = new ExpenseUseCaseGetMonthlyReport(expenseRepositoryFindMock);

    return { useCase, expenseRepositoryFindMock };
};

describe("ExpenseUseCaseGetMonthlyReport", () => {
    it("Deve ser possível instanciar ExpenseUseCaseGetMonthlyReport", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });

    it("Deve buscar despesas por mês e ano com sucesso", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
    
        const userId = "user123";
        const month = 6;
        const year = 2022;
    
        const expenses = [
            {
                id: "expense1",
                iduser: userId,
                description: "Compra de livro",
                amount: 100,
                date: new Date('2022-06-01'),
                category: "Educação",
                status: true
            },
            {
                id: "expense2",
                iduser: userId,
                description: "Compra de material",
                amount: 200,
                date: new Date('2022-06-15'),
                category: "Educação",
                status: true
            },
            {
                id: "expense3",
                iduser: userId,
                description: "Compra de outro material",
                amount: 300,
                date: new Date('2022-05-15'),
                category: "Educação",
                status: true
            }
        ];
    
        expenseRepositoryFindMock.findAll = jest.fn().mockResolvedValue(expenses);
        
        const result = await useCase.getMonthlyReport(userId, month, year);
    
        expect(expenseRepositoryFindMock.findAll).toHaveBeenCalledTimes(1);
    
        // Verifique se o método getMonthlyReport está retornando as despesas corretas
        const filteredExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === year && expense.iduser === userId;
        });
    
        expect(result).toEqual(filteredExpenses);
    });

    it("Deve buscar despesas por mês e ano com sucesso", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();
    
        const userId = "user123";
        const month = 6;
        const year = 2022;
    
        const expenses = [
            {
                id: "expense1",
                iduser: userId,
                description: "Compra de livro",
                amount: 100,
                date: new Date('2022-06-01'),
                category: "Educação",
                status: true
            },
            {
                id: "expense2",
                iduser: userId,
                description: "Compra de material",
                amount: 200,
                date: new Date('2022-06-15'),
                category: "Educação",
                status: true
            },
            {
                id: "expense3",
                iduser: "outroUser",
                description: "Compra de outro material",
                amount: 300,
                date: new Date('2022-06-15'),
                category: "Educação",
                status: true
            }
        ];
    
        expenseRepositoryFindMock.findAll = jest.fn().mockResolvedValue(expenses);
        
        const result = await useCase.getMonthlyReport(userId, month, year);
    
        expect(expenseRepositoryFindMock.findAll).toHaveBeenCalledTimes(1);
    
        // Verifique se o método getMonthlyReport está retornando as despesas corretas
        const filteredExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expense.iduser === userId && expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === year;
        });
    
        expect(result).toEqual(filteredExpenses);
    });

    it("Deve lançar um erro se o usuário for inválido", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();

        const userId = "";
        const month = 6;
        const year = 2022;

        await expect(useCase.getMonthlyReport(userId, month, year)).rejects.toThrow("UserId é obrigatório");
    });

    it("Deve lançar um erro se o mês for inválido", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();

        const userId = "user123";
        const month = 13;
        const year = 2022;

        await expect(useCase.getMonthlyReport(userId, month, year)).rejects.toThrow("Mês inválido");
    });

    it("Deve lançar um erro se o ano for inválido", async () => {
        const { useCase, expenseRepositoryFindMock } = makeSUT();

        const userId = "user123";
        const month = 6;
        const year = 0;

        await expect(useCase.getMonthlyReport(userId, month, year)).rejects.toThrow("Ano inválido");
    });

});