import { Request, Response } from "express";

import { IUserUseCaseRegister } from "../../contract/usecase/IUserUseCase";

import {z} from "zod";
import {  IUserControllerRegister } from "../../contract/controllers/IUserController";


export class UserControllerRegister implements IUserControllerRegister{

    private userUseCase: IUserUseCaseRegister;

    constructor(userUseCase: IUserUseCaseRegister){
        this.userUseCase = userUseCase;
    }

    async register(req: Request, res: Response): Promise<Response> {
        try{
            const schema = z.object({
                name: z.string().min(4,  "O nome deve ter no mínimo 4 caracteres."),
                email: z.string().email("E-mail inválido."),
                password: z.string().min(5, "A senha deve ter no mínimo 5 caracteres."),
                confirmPassword: z.string().min(5, "A senha deve ter no mínimo 5 caracteres.")
            }).refine(data => data.password === data.confirmPassword, {message: "As senhas não coincidem."});

            const {name, email, password} = schema.parse(req.body);

            const result = await this.userUseCase.register({name, email, password});

            if(!result.success){
                return res.status(400).json({message: result.message});
            }
            return res.status(201).json({message: result.message});
        } catch(err){
            
           

            if(err instanceof z.ZodError){
                return res.status(400).json({message: "Erro de validação", errors: err.errors});
            }

            return res.status(500).json({message: "Erro interno no servidor."});
        }
    }

}