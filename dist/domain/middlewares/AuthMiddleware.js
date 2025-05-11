"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const AuthService_1 = require("../Auth/AuthService");
require("../../types/express");
function authMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Pegar o token do cabeçalho
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido." });
    }
    const user = AuthService_1.AuthService.verifyToken(token); // Ensure verifyToken returns a value
    if (!user) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
    // Anexar o usuário autenticado ao request para uso posterior
    req.user = user;
    next();
}
