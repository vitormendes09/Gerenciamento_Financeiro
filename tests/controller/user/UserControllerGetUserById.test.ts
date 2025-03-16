import { UserControllerGetUserById } from "../../../src/controller/User/UserControllerGetUserById";
import { IUserUseCaseGetUserById } from "../../../src/contract/usecase/IUserUseCase";
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

  const useCaseMock: IUserUseCaseGetUserById = {
    getUserById: jest.fn().mockResolvedValue({ id: "123", name: "John Doe" }),
  };

  const controller = new UserControllerGetUserById(useCaseMock);
  return { controller, requestStub, responseFake, useCaseMock };
};

describe("UserControllerGetUserById", () => {
  it("Deve ser possível instanciar UserControllerGetUserById", () => {
    const { controller } = makeSUT();
    expect(controller).toBeDefined();
  });

  it("Deve chamar o caso de uso corretamente", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

    await controller.getUserById(requestStub, responseFake);

    expect(useCaseMock.getUserById).toHaveBeenCalledTimes(1);
    expect(useCaseMock.getUserById).toHaveBeenCalledWith("123");
  });

  it("Deve retornar status 200 e os dados do usuário", async () => {
    const { controller, requestStub, responseFake } = makeSUT();

    await controller.getUserById(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(200);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      id: "123",
      name: "John Doe",
    });
  });

  it("Deve retornar status 404 se o usuário não for encontrado", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
    (useCaseMock.getUserById as jest.Mock).mockResolvedValue(null);

    await controller.getUserById(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(404);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      message: "Usuário não encontrado.",
    });
  });

  it("Deve retornar status 500 se ocorrer um erro inesperado", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
    (useCaseMock.getUserById as jest.Mock).mockRejectedValue(new Error("Erro interno"));

    await controller.getUserById(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(500);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      message: "Erro interno no servidor",
    });
  });
});
