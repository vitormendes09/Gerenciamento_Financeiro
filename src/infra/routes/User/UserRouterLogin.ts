import {Router} from "express"

import { UserFactoryLogin } from "../../factory/User/UserFactoryLogin"


async function UserRouterLogin() {


    const user = await UserFactoryLogin();

    const router = Router();

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
    router.post("/auth/login", async (req, res) => {
        try {
            await user.login(req, res)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao logar usuário" });
        }
    });

    return router;

}

export default UserRouterLogin