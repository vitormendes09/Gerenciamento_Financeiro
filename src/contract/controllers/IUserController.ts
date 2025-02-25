import { Request, Response } from "express";

export interface IUserController {
    getUserById(req: Request, res: Response): Promise<Response>;
    register(req: Request, res: Response): Promise<Response>;
    login(req: Request, res: Response): Promise<Response>;
}


export interface IUserControllerRegister{
    register(req: Request, res: Response): Promise<Response>;
}

export interface IUserControllerLogin{
    login(req: Request, res: Response): Promise<Response>;
}

export interface IUserControllerGetUserById{
    getUserById(req: Request, res: Response): Promise<Response>;
}
