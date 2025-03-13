import { ExpenseControllerGetMothlyReport } from "../../../src/controller/Expense/ExpenseControllerGetMothlyReport";
import { Request, Response } from "express";
import { IExpenseUseCaseGetMonthlyReport } from "../../../src/contract/usecase/IExpenseUseCase";
import { IExpenseRepositoryFind } from "../../../src/contract/repositories/IExpenseRepository";
import { IExpense } from "../../../src/contract/entities/IExpense";

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
    params: { userId: "123", month: "2", year: "2025" },
  } as unknown as Request;
  const responseFake = new ResponseFake() as unknown as Response;

  const useCaseMock: IExpenseUseCaseGetMonthlyReport = {
    getMonthlyReport: jest.fn().mockResolvedValue([
      { description: "Aluguel", amount: 1500, category: "Moradia" },
    ]),
  };

  const repositoryMock: IExpenseRepositoryFind<IExpense> = {
    findByUserId: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    findByCategory: jest.fn(),
    findByUserAndDate: jest.fn(),
  };

  const controller = new ExpenseControllerGetMothlyReport(
    useCaseMock,
    repositoryMock
  );
  return { controller, requestStub, responseFake, useCaseMock };
};

describe("ExpenseControllerGetMonthlyReport", () => {
  it("Deve ser possível instanciar ExpenseControllerGetMonthlyReport", () => {
    const { controller } = makeSUT();
    expect(controller).toBeDefined();
  });

  it("Deve chamar o caso de uso corretamente", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

    await controller.getMonthlyReport(requestStub, responseFake);

    expect(useCaseMock.getMonthlyReport).toHaveBeenCalledTimes(1);
    expect(useCaseMock.getMonthlyReport).toHaveBeenCalledWith(
      requestStub.params.userId,
      2,
      2025
    );
  });

  it("Deve retornar status 200 e o relatório gerado", async () => {
    const { controller, requestStub, responseFake } = makeSUT();

    await controller.getMonthlyReport(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(200);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      report: [{ description: "Aluguel", amount: 1500, category: "Moradia" }],
    });
  });

  it("Deve retornar status 500 se ocorrer um erro inesperado", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

    (useCaseMock.getMonthlyReport as jest.Mock).mockRejectedValue(
      new Error("Erro ao gerar relatório")
    );

    await controller.getMonthlyReport(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(500);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      message: "Erro ao gerar relatório mensal.",
      error: new Error("Erro ao gerar relatório"),
    });
  });
});