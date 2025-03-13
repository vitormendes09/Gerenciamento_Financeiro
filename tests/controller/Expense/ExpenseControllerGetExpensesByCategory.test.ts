import { ExpenseControllerGetExpensesByCategory } from "../../../src/controller/Expense/ExpenseControllerGetExpensesByCategory";
import { IExpenseUseCaseGetExpensesByCategory } from "../../../src/contract/usecase/IExpenseUseCase";
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
  const requestStub = {
    params: { category: "Alimentação", userId: "123" },
  } as unknown as Request;
  const responseFake = new ResponseFake() as unknown as Response;

  const useCaseMock: IExpenseUseCaseGetExpensesByCategory = {
    getExpensesByCategory: jest.fn().mockResolvedValue([
      { id: "1", description: "Jantar", amount: 50, category: "Alimentação", userId: "123" },
    ]  as unknown  as IExpense[]),
  };

  const repositoryMock: IExpenseRepositoryFind<IExpense> = {
    findByUserId: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    findByCategory: jest.fn(),
    findByUserAndDate: jest.fn(),
  };

  const controller = new ExpenseControllerGetExpensesByCategory(useCaseMock, repositoryMock);
  return { controller, requestStub, responseFake, useCaseMock };
};

describe("ExpenseControllerGetExpensesByCategory", () => {
  it("Deve ser possível instanciar ExpenseControllerGetExpensesByCategory", () => {
    const { controller } = makeSUT();
    expect(controller).toBeDefined();
  });

  it("Deve chamar o caso de uso corretamente", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

    await controller.getExpensesByCategory(requestStub, responseFake);

    expect(useCaseMock.getExpensesByCategory).toHaveBeenCalledTimes(1);
    expect(useCaseMock.getExpensesByCategory).toHaveBeenCalledWith("123", "Alimentação");
  });

  it("Deve retornar status 200 e a lista de despesas da categoria", async () => {
    const { controller, requestStub, responseFake } = makeSUT();

    await controller.getExpensesByCategory(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(200);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      expenses: [{ id: "1", description: "Jantar", amount: 50, category: "Alimentação", userId: "123" }],
    });
  });

  it("Deve retornar status 400 se 'category' ou 'userId' estiverem ausentes", async () => {
    const { controller, responseFake } = makeSUT();
    const requestStub = { params: {} } as unknown as Request;

    await controller.getExpensesByCategory(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(400);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({ message: "Categoria e ID do usuário são obrigatórios." });
  });

  it("Deve retornar status 404 se nenhuma despesa for encontrada", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
    (useCaseMock.getExpensesByCategory as jest.Mock).mockResolvedValue([]);

    await controller.getExpensesByCategory(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(404);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({ message: "Nenhuma despesa encontrada para essa categoria e usuário." });
  });

  it("Deve retornar status 500 se ocorrer um erro inesperado", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
    (useCaseMock.getExpensesByCategory as jest.Mock).mockRejectedValue(new Error("Erro interno"));

    await controller.getExpensesByCategory(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(500);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({ message: "Erro ao buscar despesas por categoria." });
  });
});
