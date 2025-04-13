import {Router} from "express"
import { UserFactoryRegister } from "../../factory/User/UserFactoryRegister"

async function UserRouterRegister() {


    const user = await UserFactoryRegister()
    const router = Router()

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

    router.post("/auth/register", async (req, res) => {
        try {
            await user.register(req, res);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao registrar usuário" });
        }
    });

    return router;

}


export default UserRouterRegister;