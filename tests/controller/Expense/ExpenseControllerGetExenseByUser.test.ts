import { ExpenseControllerGetExpensesByUser } from "../../../src/controller/Expense/ExpenseControllerGetExpensesByUser";
import { IExpenseUseCaseGetExpensesByUser } from "../../../src/contract/usecase/IExpenseUseCase";
import { IExpenseRepositoryFind } from "../../../src/contract/repositories/IExpenseRepository";
import { IExpense } from "../../../src/contract/entities/IExpense";
import { Request, Response } from "express";

class ResponseFake {
    statusCode?: number;
    jsonData: any;
    endChamado = false;

    status(statusCode: number) {
        this.statusCode = statusCode;
        return this;
    }
    json(obj: any) {
        this.jsonData = obj;
        return this;
    }
    end() {
        this.endChamado = true;
        return this;
    }
}

const makeSUT = () => {
    const responseFake = new ResponseFake() as unknown as Response;
    const useCaseMock: IExpenseUseCaseGetExpensesByUser = {
        getExpensesByUser: jest.fn().mockResolvedValue([
            { id: "1", userId: "123", description: "Aluguel", amount: 1500 },
        ] as unknown as IExpense[]),
    };
    const repositoryMock: IExpenseRepositoryFind<IExpense> = {
        findByUserId: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        findByCategory: jest.fn(),
        findByUserAndDate: jest.fn(),
    };
    const controller = new ExpenseControllerGetExpensesByUser(
        useCaseMock,
        repositoryMock
    );
    return { controller, responseFake, useCaseMock, repositoryMock };
};

describe("ExpenseControllerGetExpensesByUser", () => {
    it("Deve ser possível instanciar ExpenseControllerGetExpensesByUser", () => {
        const { controller } = makeSUT();
        expect(controller).toBeDefined();
    });

    it("Deve retornar status 400 se 'userId' estiver ausente", async () => {
        const { controller, responseFake } = makeSUT();
        await controller.getExpensesByUser("", responseFake);
        expect(responseFake.statusCode).toBe(400);
        expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
            message: "O ID do usuário é obrigatório.",
        });
    });

    it("Deve chamar o caso de uso corretamente", async () => {
        const { controller, responseFake, useCaseMock } = makeSUT();
        await controller.getExpensesByUser("123", responseFake);
        expect(useCaseMock.getExpensesByUser).toHaveBeenCalledTimes(1);
        expect(useCaseMock.getExpensesByUser).toHaveBeenCalledWith("123");
    });

    it("Deve retornar status 404 se nenhuma despesa for encontrada", async () => {
        const { controller, responseFake, useCaseMock } = makeSUT();
        (useCaseMock.getExpensesByUser as jest.Mock).mockResolvedValue([]);
        await controller.getExpensesByUser("123", responseFake);
        expect(responseFake.statusCode).toBe(404);
        expect((responseFake as unknown as ResponseFake).jsonData).toEqual({ message: "Nenhuma despesa encontrada." });
    });

    it("Deve retornar status 200 e uma lista de despesas", async () => {
        const { controller, responseFake } = makeSUT();
        await controller.getExpensesByUser("123", responseFake);
        expect(responseFake.statusCode).toBe(200);
        expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
            expenses: [{ id: "1", userId: "123", description: "Aluguel", amount: 1500 }],
        });
    });

    it("Deve retornar status 500 se ocorrer um erro inesperado", async () => {
        const { controller, responseFake, useCaseMock } = makeSUT();
        (useCaseMock.getExpensesByUser as jest.Mock).mockRejectedValue(new Error("Erro interno"));
        await controller.getExpensesByUser("123", responseFake);
        expect(responseFake.statusCode).toBe(500);
        expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
            message: "Erro ao buscar despesas por usuário.",
            error: new Error("Erro interno"),
        });
    });
});
