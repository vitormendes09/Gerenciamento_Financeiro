import { UserControllerRegister } from "../../../src/controller/User/UserControllerRegister";
import { IUserUseCaseRegister } from "../../../src/contract/usecase/IUserUseCase";
import { Request, Response } from "express";
import { ZodError } from "zod";

class ResponseFake {
    statusCode?: number;
    jsonData: any;

    status(statusCode: number) {
        this.statusCode = statusCode;
        return this;
    }

    json(obj: any) {
        this.jsonData = obj;
        return this;
    }
}

const makeSUT = () => {
    const requestStub = {
        body: {
            name: "João Silva",
            email: "joao@example.com",
            password: "senha123",
            confirmPassword: "senha123"
        }
    } as unknown as Request;

    const responseFake = new ResponseFake() as unknown as Response;

    const useCaseMock: IUserUseCaseRegister = {
        register: jest.fn().mockResolvedValue({ success: true, message: "Usuário registrado com sucesso!" }),
    };

    const controller = new UserControllerRegister(useCaseMock);
    return { controller, requestStub, responseFake, useCaseMock };
};

describe("UserControllerRegister", () => {
    it("Deve ser possível instanciar UserControllerRegister", () => {
        const { controller } = makeSUT();
        expect(controller).toBeDefined();
    });

    it("Deve chamar o caso de uso corretamente", async () => {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();

        await controller.register(requestStub, responseFake);

        expect(useCaseMock.register).toHaveBeenCalledTimes(1);
        expect(useCaseMock.register).toHaveBeenCalledWith({
            name: "João Silva",
            email: "joao@example.com",
            password: "senha123"
        });
    });

    it("Deve retornar status 201 e mensagem de sucesso", async () => {
        const { controller, requestStub, responseFake } = makeSUT();

        await controller.register(requestStub, responseFake);

        expect(responseFake.statusCode).toBe(201);
        expect((responseFake as unknown as ResponseFake).jsonData).toEqual({ message: "Usuário registrado com sucesso!" });
    });

    it("Deve retornar status 400 se as senhas não coincidirem", async () => {
        const { controller, responseFake } = makeSUT();
        const requestStub = { body: { name: "João", email: "joao@example.com", password: "senha123", confirmPassword: "senha456" } } as unknown as Request;

        await controller.register(requestStub, responseFake);

        expect(responseFake.statusCode).toBe(400);
        expect((responseFake as unknown as ResponseFake).jsonData).toHaveProperty("message", "Erro de validação");
        expect((responseFake as unknown as ResponseFake).jsonData.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ message: "As senhas não coincidem." })
            ])
        );
    });

    it("Deve retornar status 400 se a validação de dados falhar", async () => {
        const { controller, responseFake } = makeSUT();
        const requestStub = { body: { name: "Jo", email: "invalidemail", password: "123", confirmPassword: "123" } } as unknown as Request;

        await controller.register(requestStub, responseFake);

        expect(responseFake.statusCode).toBe(400);
        expect((responseFake as unknown as ResponseFake).jsonData).toHaveProperty("message", "Erro de validação");
        expect((responseFake as unknown as ResponseFake).jsonData.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ message: "O nome deve ter no mínimo 4 caracteres." }),
                expect.objectContaining({ message: "E-mail inválido." }),
                expect.objectContaining({ message: "A senha deve ter no mínimo 5 caracteres." })
            ])
        );
    });

    it("Deve retornar status 500 se ocorrer um erro inesperado", async () => {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        (useCaseMock.register as jest.Mock).mockRejectedValue(new Error("Erro interno"));

        await controller.register(requestStub, responseFake);

        expect(responseFake.statusCode).toBe(500);
        expect((responseFake as unknown as ResponseFake).jsonData).toEqual({ message: "Erro interno no servidor." });
    });

    it("Deve capturar e tratar erros inesperados que não sejam do Zod", async () => {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        
        (useCaseMock.register as jest.Mock).mockRejectedValue(new Error("Erro desconhecido"));
    
        await controller.register(requestStub, responseFake);
    
        expect(responseFake.statusCode).toBe(500);
        expect((responseFake as unknown as ResponseFake).jsonData).toEqual({ message: "Erro interno no servidor." });
    });

    it("Deve capturar um ZodError corretamente", async () => {
        const { controller, responseFake } = makeSUT();
        const requestStub = { body: {} } as unknown as Request;

        await controller.register(requestStub, responseFake);

        expect(responseFake.statusCode).toBe(400);
        expect((responseFake as unknown as ResponseFake).jsonData).toHaveProperty("message", "Erro de validação");
        expect((responseFake as unknown as ResponseFake).jsonData.errors).toBeInstanceOf(Array);
    });

    it("Deve retornar status 400 se o caso de uso falhar", async () => {
        const { controller, requestStub, responseFake, useCaseMock } = makeSUT();
        (useCaseMock.register as jest.Mock).mockResolvedValue({
            success: false,
            message: "Erro ao criar usuário"
        });
    
        await controller.register(requestStub, responseFake);
    
        expect(responseFake.statusCode).toBe(400);
        expect((responseFake as unknown as ResponseFake).jsonData).toEqual({ message: "Erro ao criar usuário" });
    });
    
    
});
