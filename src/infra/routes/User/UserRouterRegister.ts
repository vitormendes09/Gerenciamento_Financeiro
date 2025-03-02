import {Router} from "express"
import { UserFactoryRegister } from "../../factory/User/UserFactoryRegister"

async function UserRouterRegister() {


    const user = await UserFactoryRegister()
    const router = Router()

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