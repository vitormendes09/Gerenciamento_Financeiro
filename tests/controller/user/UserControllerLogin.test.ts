import { UserControllerLogin } from "../../../src/controller/User/UserControllerLogin";
import { IUserUseCaseLogin } from "../../../src/contract/usecase/IUserUseCase";
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
    body: { email: "test@example.com", password: "password123" },
  } as unknown as Request;
  const responseFake = new ResponseFake() as unknown as Response;

  const useCaseMock: IUserUseCaseLogin = {
    login: jest.fn().mockResolvedValue({
      success: true,
      message: "Login bem-sucedido.",
      token: "token123",
    }),
  };

  const controller = new UserControllerLogin(useCaseMock);
  return { controller, requestStub, responseFake, useCaseMock };
};

describe("UserControllerLogin", () => {
  it("Deve ser possível instanciar UserControllerLogin", () => {
    const { controller } = makeSUT();
    expect(controller).toBeDefined();
  });

  it("Deve chamar o caso de uso de login corretamente", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

    await controller.login(requestStub, responseFake);

    expect(useCaseMock.login).toHaveBeenCalledTimes(1);
    expect(useCaseMock.login).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("Deve retornar status 200 e um token se o login for bem-sucedido", async () => {
    const { controller, requestStub, responseFake } = makeSUT();

    await controller.login(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(200);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      message: "Login bem-sucedido.",
      token: "token123",
    });
  });

  it("Deve retornar status 400 se o login falhar", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
    (useCaseMock.login as jest.Mock).mockResolvedValue({
      success: false,
      message: "Credenciais inválidas.",
      token: "",
    });

    await controller.login(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(400);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      message: "Credenciais inválidas.",
    });
  });

  it("Deve retornar status 400 se a validação falhar", async () => {
    const { controller, responseFake } = makeSUT();
    const requestStub = { body: { email: "invalidemail", password: "password123" } } as unknown as Request;

    await controller.login(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(400);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      message: "Erro de validação",
      errors: expect.any(Array),
    });
  });

  it("Deve retornar status 500 se ocorrer um erro inesperado", async () => {
    const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
    (useCaseMock.login as jest.Mock).mockRejectedValue(new Error("Erro interno"));

    await controller.login(requestStub, responseFake);

    expect(responseFake.statusCode).toBe(500);
    expect((responseFake as unknown as ResponseFake).jsonData).toEqual({
      message: "Erro interno no servidor.",
    });
  });
});
