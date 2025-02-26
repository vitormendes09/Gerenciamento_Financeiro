import { Request, Response } from "express";
import { IUserUseCaseGetUserById } from "../../contract/usecase/IUserUseCase";
import { z } from "zod";
import { IUserControllerGetUserById } from "../../contract/controllers/IUserController";

export class UserControllerGetUserById implements IUserControllerGetUserById {
    private userUseCase: IUserUseCaseGetUserById;

    constructor(userUseCase: IUserUseCaseGetUserById) {
        this.userUseCase = userUseCase;
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await this.userUseCase.getUserById(id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

}