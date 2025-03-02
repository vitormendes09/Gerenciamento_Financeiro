import { Request, Response } from "express";

export interface IUserControllerRegister{
    register(req: Request, res: Response): Promise<Response>;
}

export interface IUserControllerLogin{
    login(req: Request, res: Response): Promise<Response>;
}

export interface IUserControllerGetUserById{
    getUserById(req: Request, res: Response): Promise<Response>;
}
