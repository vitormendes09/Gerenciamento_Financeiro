import { ExpenseControllerCreateExpense } from "../../../src/controller/Expense/ExpenseControllerCreateExpense";
import { ExpenseInput, ExpenseOutput, IExpenseUseCaseCreateExpense } from "../../../src/contract/usecase/IExpenseUseCase";
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
    body: { userId: "123", description: "Aluguel", amount: 1500 },
  } as Request;
  const responseFake = new ResponseFake() as unknown as Response;

  const useCaseMock: IExpenseUseCaseCreateExpense = {
    createExpense: jest.fn().mockResolvedValue({
      success: true,
      message: "Despesa criada com sucesso.",
    }),
  };

  const controller = new ExpenseControllerCreateExpense(useCaseMock);
  return { controller, requestStub, responseFake, useCaseMock };
};

describe("ExpenseControllerCreateExpense", () => {
  it("Deve ser possível instanciar ExpenseControllerCreateExpense", () => {
    const { controller } = makeSUT();
    expect(controller).toBeDefined();
  });

  it("Deve chamar o caso de uso corretamente", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

    await controller.createExpense(requestStub, responseFake);

    // O mock foi chamado 1 vez
    expect(useCaseMock.createExpense).toHaveBeenCalledTimes(1);

    // O argumento passado para a função foi o requestStub.body
    expect(useCaseMock.createExpense).toHaveBeenCalledWith({
      iduser: requestStub.body.userId,
      description: requestStub.body.description,
      amount: requestStub.body.amount,
      date: undefined,
      category: undefined,
      status: "active",
    });
    
  });

  it("Deve retornar status 201 e a despesa criada", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

    await controller.createExpense(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(201);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({

      message: "Despesa criada com sucesso.",
    });

  });

  it("Deve retornar status 400 se 'description' ou 'amount' estiverem ausentes", async () => {
    const { controller, responseFake } = makeSUT();
  
    const requestStub = { body: { userId: "123" } } as Request;
  
    await controller.createExpense(requestStub, responseFake);
  
    expect(responseFake.statusCode).toBe(400);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      message: "Os campos 'description' e 'amount' são obrigatórios.",
    });
  });

  it("Deve retornar status 400 se 'userId' estiver ausente", async () => {
    const { controller, responseFake } = makeSUT();
    const requestStub = { body: { description: "Aluguel", amount: 1500 } } as Request;

    await controller.createExpense(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(400);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      message: "O ID do usuário é obrigatório.",
    });
  });

  it("Deve retornar status 400 se o caso de uso lançar o erro 'Erro ao criar despesa'", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

    (useCaseMock.createExpense as jest.Mock).mockRejectedValue(new Error("Erro ao criar despesa"));

    await controller.createExpense(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(400);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      message: "Erro ao criar despesa",
    });
  });


  it("Deve retornar status 400 se o caso de uso lançar um erro esperado", async () => {
    const { controller, responseFake } = makeSUT();
    const requestStub = { body: { userId: "123" } } as Request;

    await controller.createExpense(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(400);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      message: "Os campos 'description' e 'amount' são obrigatórios.", // ❌ ERRO AQUI
    });
  });

  it("Deve retornar status 500 se ocorrer um erro inesperado", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

    (useCaseMock.createExpense as jest.Mock).mockRejectedValue(new Error("Erro desconhecido"));

    await controller.createExpense(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(500);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      message: "Erro interno do servidor",
    });
  });
  
});
