import { Router } from "express";
import { UserFactory } from "../factory/UserFactory";
import { ExpenseFactory } from "../factory/ExpenseFactory";



async function createRoutes() {
    const userController = await UserFactory();
    const expenseController = await ExpenseFactory();

    const router = Router();

    router.get("/", (req, res) => {
        res.status(200).json({ message: "Hello World! API está rodando " });
    });

    // Rotas de autenticação
    router.post("/auth/register", async (req, res) => {
        try {
            await userController.register(req, res);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao registrar usuário" });
        }
    });
    router.get("/auth/login", async (req, res) => {
        try {
            await userController.login(req, res)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao logar usuário" });
        }
    });

    // Rotas de usuário
    router.get("/users/:id", async (req, res) => {
        try {
            await userController.getUserById(req, res);
        }
        catch (error) {
            res.status(500).json({ msg: "Erro ao buscar usuário" });
        }
    });


    // Rotas de despesas
    router.post("/expenses", async (req, res) => {
        try {
            await expenseController.createExpense(req, res)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao criar despesa" });
        }
    });

    router.get("/expenses", async (req, res) => {
        try {
            await expenseController.getExpensesByUser(req, res)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar despesas" });
        }
    });
    router.get("/expenses/:category", async (req, res) => {
        try {
            await expenseController.getExpensesByCategory(req, res)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar despesas" });
        }
    });
    router.delete("/expenses/:id", async (req, res) => {
        try {
            await expenseController.deleteExpense(req, res)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao deletar despesa" });

        }
    });

    router.get("/expenses/monthly/:userId/:month/:year", async (req, res) => {
        try {
            await expenseController.getMonthlyReport(req, res)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar relatório mensal de despesas" });
        }
    });

    return router;

}


export default createRoutes;