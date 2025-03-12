import { ExpenseControllerDeleteExpense } from "../../../src/controller/Expense/ExpenseControllerDeleteExpense";
import { IExpenseUseCaseDeleteExpense } from "../../../src/contract/usecase/IExpenseUseCase";
import { IExpenseRepositoryDelete } from "../../../src/contract/repositories/IExpenseRepository";
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
    params: { id: "123" },
  } as unknown as Request;
  const responseFake = new ResponseFake() as unknown as Response;

  const useCaseMock: IExpenseUseCaseDeleteExpense = {
    deleteExpense: jest.fn().mockResolvedValue({
      success: true,
      message: "Despesa excluída com sucesso.",
    }),
  };


  const repositoryMock: IExpenseRepositoryDelete<IExpense> = {
    delete: jest.fn(),
    findById: jest.fn(),
  };

  const controller = new ExpenseControllerDeleteExpense(useCaseMock, repositoryMock);
  return { controller, requestStub, responseFake, useCaseMock };
};

describe("ExpenseControllerDeleteExpense", () => {
  it("Deve ser possível instanciar ExpenseControllerDeleteExpense", () => {
    const { controller } = makeSUT();
    expect(controller).toBeDefined();
  });

  it("Deve chamar o caso de uso corretamente", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

    await controller.deleteExpense(requestStub, responseFake);

    expect(useCaseMock.deleteExpense).toHaveBeenCalledTimes(1);
    expect(useCaseMock.deleteExpense).toHaveBeenCalledWith("123");
  });

  it("Deve retornar status 200 e mensagem de sucesso ao deletar uma despesa", async () => {
    const { controller, requestStub, responseFake } = makeSUT();

    await controller.deleteExpense(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(200);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({ message: "Despesa excluída com sucesso." });
  });



  it("Deve retornar status 400 se a despesa não for encontrada", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

    (useCaseMock.deleteExpense as jest.Mock).mockResolvedValue({
      success: false,
      message: "Despesa não encontrada.",
    });

    await controller.deleteExpense(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(400);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({ message: "Despesa não encontrada." });
  });
  

  it("Deve retornar status 500 em caso de erro inesperado", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

    (useCaseMock.deleteExpense as jest.Mock).mockRejectedValue(new Error("Erro desconhecido"));

    await controller.deleteExpense(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(500);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({ message: "Erro interno no servidor." });
  });
});
