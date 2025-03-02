import {Router} from "express"

import { UserFactoryLogin } from "../../factory/User/UserFactoryLogin"


async function UserRouterLogin() {


    const user = await UserFactoryLogin();

    const router = Router();

    router.get("/auth/login", async (req, res) => {
        try {
            await user.login(req, res)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao logar usuário" });
        }
    });

    return router;

}

export default UserRouterLogin