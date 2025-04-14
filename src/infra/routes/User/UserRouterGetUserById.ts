import { Router } from "express";
import { UserFactoryGetUserById } from "../../factory/User/UserFactoryGetUserById";

async function UserRouterGetUserById() {
    const user = await UserFactoryGetUserById()
    const router = Router(); 

    /**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Usuários]
 *     description: Retorna os dados de um usuário específico a partir de um ID válido armazenado no banco MongoDB.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário (ObjectId do MongoDB)
 *         schema:
 *           type: string
 *           example: 67d6519492ac0a187ebc0ae8
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User found
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 67d6519492ac0a187ebc0ae8
 *                     name:
 *                       type: string
 *                       example: Adriano
 *                     email:
 *                       type: string
 *                       example: Adriano@gmail.com
 *                     password:
 *                       type: string
 *                       example: $2b$10$b87IEQkLfqz1Tx2msN2LVumpMWY/Fwvsq5/qJTlVUxHLQ1bw9GO9G
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário não encontrado.
 *       400:
 *         description: ID inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Id is required
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro interno no servidor
 */


    router.get("/users/:id", async (req, res) => {
        try {
           await user.getUserById(req, res);
        }
        catch (error) {
            res.status(500).json({ msg: "Erro ao buscar usuário" });
        }
    });

    return router;

}


export default UserRouterGetUserById;