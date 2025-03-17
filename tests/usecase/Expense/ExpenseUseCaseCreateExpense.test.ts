import { ExpenseUseCaseCreateExpense } from "../../../src/domain/usecase/Expense/ExpenseUseCaseCreateExpense";
import { IExpenseRepositoryInsert } from "../../../src/contract/repositories/IExpenseRepository";
import { IExpense } from "../../../src/contract/entities/IExpense";

const makeSUT = () => {
    const expenseRepositoryMock: IExpenseRepositoryInsert<IExpense> = {
        insert: jest.fn().mockResolvedValue(true),
    };

    const useCase = new ExpenseUseCaseCreateExpense(expenseRepositoryMock);

    return { useCase, expenseRepositoryMock };
};

describe("ExpenseUseCaseCreateExpense", () => {
    it("Deve ser possível instanciar ExpenseUseCaseCreateExpense", () => {
        const { useCase } = makeSUT();
        expect(useCase).toBeDefined();
    });

    it("Deve criar uma despesa com sucesso", async () => {
        const { useCase, expenseRepositoryMock } = makeSUT();

        const input = {
            iduser: "user123",
            description: "Compra de material",
            amount: 100.5,
            date: new Date(),
            category: "Educação",
            status: "true"
        };

        const result = await useCase.createExpense(input);

        expect(expenseRepositoryMock.insert).toHaveBeenCalledTimes(1);
        expect(expenseRepositoryMock.insert).toHaveBeenCalledWith(input.iduser, {
            ...input,
            status: true
        });
        expect(result).toEqual({
            success: true,
            message: "Despesa criada com sucesso."
        });
    });

    it("Deve retornar erro se 'description' estiver ausente", async () => {
        const { useCase, expenseRepositoryMock } = makeSUT();

        const input = {
            iduser: "user123",
            description: "",
            amount: 100.5,
            date: new Date(),
            category: "Alimentação",
            status: "true"
        };

        const result = await useCase.createExpense(input);

        expect(expenseRepositoryMock.insert).not.toHaveBeenCalled();
        expect(result).toEqual({
            success: false,
            message: "Os campos 'description' e 'amount' são obrigatórios."
        });
    });

    it("Deve retornar erro se 'amount' estiver ausente", async () => {
        const { useCase, expenseRepositoryMock } = makeSUT();

        const input = {
            iduser: "user123",
            description: "Compra de eletrônicos",
            amount: undefined,
            date: new Date(),
            category: "Tecnologia"
        } as any; // Forçando o tipo para simular um erro

        const result = await useCase.createExpense(input);

        expect(expenseRepositoryMock.insert).not.toHaveBeenCalled();
        expect(result).toEqual({
            success: false,
            message: "Os campos 'description' e 'amount' são obrigatórios."
        });
    });

    it("Deve capturar erro inesperado e não quebrar a aplicação", async () => {
        const { useCase, expenseRepositoryMock } = makeSUT();
        (expenseRepositoryMock.insert as jest.Mock).mockRejectedValue(new Error("Erro no banco de dados"));

        const input = {
            iduser: "user123",
            description: "Compra online",
            amount: 200,
            date: new Date(),
            category: "E-commerce",
            status: "true"
        };

        await expect(useCase.createExpense(input)).rejects.toThrow("Erro no banco de dados");
    });
});
