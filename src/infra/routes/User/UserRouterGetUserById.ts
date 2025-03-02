import { Router } from "express";
import { UserFactoryGetUserById } from "../../factory/User/UserFactoryGetUserById";

async function UserRouterGetUserById() {
    const user = await UserFactoryGetUserById()
    const router = Router(); 

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