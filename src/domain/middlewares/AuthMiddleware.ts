import { Request, Response, NextFunction } from "express";
import { AuthService } from "../Auth/AuthService";
import "../../types/express"; 

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1]; // Pegar o token do cabeçalho

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    const user = AuthService.verifyToken(token) as any; // Ensure verifyToken returns a value

    if (!user) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }

    // Anexar o usuário autenticado ao request para uso posterior
    req.user = user;
    next();
}

declare module "express-serve-static-core" {
    interface Request {
        user?: any;
    }
}