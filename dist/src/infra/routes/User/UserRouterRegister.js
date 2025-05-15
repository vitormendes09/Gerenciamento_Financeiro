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
const UserFactoryRegister_1 = require("../../factory/User/UserFactoryRegister");
function UserRouterRegister() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, UserFactoryRegister_1.UserFactoryRegister)();
        const router = (0, express_1.Router)();
        /**
     * @swagger
     * /auth/register:
     *   post:
     *     summary: Registra um novo usuário
     *     tags: [Autenticação]
     *     description: Cria um novo usuário com os dados fornecidos e retorna uma mensagem de sucesso. A senha e a confirmação devem ser iguais.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - email
     *               - password
     *               - confirmPassword
     *             properties:
     *               name:
     *                 type: string
     *                 example: Vitor Mendes
     *               email:
     *                 type: string
     *                 format: email
     *                 example: vitor@email.com
     *               password:
     *                 type: string
     *                 minLength: 5
     *                 example: senha123
     *               confirmPassword:
     *                 type: string
     *                 minLength: 5
     *                 example: senha123
     *     responses:
     *       201:
     *         description: Usuário criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: User registered successfully.
     *       400:
     *         description: Erro de validação ou dados inválidos
     *         content:
     *           application/json:
     *             schema:
     *               oneOf:
     *                 - type: object
     *                   properties:
     *                     message:
     *                       type: string
     *                       example: All fields are required.
     *                 - type: object
     *                   properties:
     *                     message:
     *                       type: string
     *                       example: Email already registered.
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
     *         description: Erro interno do servidor
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Erro interno no servidor.
     */
        router.post("/auth/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield user.register(req, res);
            }
            catch (error) {
                res.status(500).json({ msg: "Erro ao registrar usuário" });
            }
        }));
        return router;
    });
}
exports.default = UserRouterRegister;
