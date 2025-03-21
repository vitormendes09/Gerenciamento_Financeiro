import { Request, Response } from "express";
import { IUserUseCaseLogin } from "../../contract/usecase/IUserUseCase";
import { z } from "zod";
import { IUserControllerLogin } from "../../contract/controllers/IUserController";

export class UserControllerLogin implements IUserControllerLogin {
    private userUseCase: IUserUseCaseLogin;

    constructor(userUseCase: IUserUseCaseLogin) {
        this.userUseCase = userUseCase;
    }
    async login(req: Request, res: Response) {
        try {
            const schema = z.object({
                email: z.string().email("E-mail inválido."),
                password: z.string()
            });

            const { email, password } = schema.parse(req.body);

            const result = await this.userUseCase.login(email, password);

            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }
            return res.status(200).json({ message: result.message, token: result.token });
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", errors: err.errors });

            }
            return res.status(500).json({ message: "Erro interno no servidor." });
        }
    }
}
