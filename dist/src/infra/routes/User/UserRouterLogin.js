"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserFactoryLogin_1 = require("../../factory/User/UserFactoryLogin");
function UserRouterLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, UserFactoryLogin_1.UserFactoryLogin)();
        const router = (0, express_1.Router)();
        /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Autentica um usuário
     *     tags: [Autenticação]
     *     description: Realiza o login de um usuário registrado, verificando o e-mail e a senha. Retorna um token JWT em caso de sucesso.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 example: valerio@gmail.com
     *               password:
     *                 type: string
     *                 example: senha123
     *     responses:
     *       200:
     *         description: Login bem-sucedido. Retorna mensagem e token JWT.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: User logged in
     *                 token:
     *                   type: string
     *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     *       400:
     *         description: Erro de validação ou falha no login.
     *         content:
     *           application/json:
     *             schema:
     *               oneOf:
     *                 - type: object
     *                   properties:
     *                     message:
     *                       type: string
     *                       example: User not found
     *                 - type: object
     *                   properties:
     *                     message:
     *                       type: string
     *                       example: Password is incorrect
     *                 - type: object
     *                   properties:
     *                     message:
     *                       type: string
     *                       example: Erro de validação
     *                     errors:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           path:
     *                             type: array
     *                             items: { type: string }
     *                           message:
     *                             type: string
     *       500:
     *         description: Erro interno do servidor.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Erro interno no servidor.
     */
        router.post("/auth/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield user.login(req, res);
            }
            catch (error) {
                res.status(500).json({ msg: "Erro ao logar usuário" });
            }
        }));
        return router;
    });
}
exports.default = UserRouterLogin;
