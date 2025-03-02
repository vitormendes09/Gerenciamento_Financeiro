import express from 'express';

import ExpenseRouterCreateExpense from './infra/routes/Expense/ExpenseRouterCreateExpense';
import ExpenseRouterGetExpensesByCategory from './infra/routes/Expense/ExpenseRouterGetExpensesByCategory';
import ExpenseRouterGetExpensesByUser from './infra/routes/Expense/ExpensesRouterGetExpensesByUser';
import ExpenseRouterGetMonthlyReport from './infra/routes/Expense/ExpensesRouterGetMonthlyReport';
import ExpenseRouterDeleteExpense from './infra/routes/Expense/ExpenseRouterDeleteExpense';
import  UserRouterLogin from './infra/routes/User/UserRouterLogin';
import UserRouterGetUserById from './infra/routes/User/UserRouterGetUserById';
import UserRouterRegister from './infra/routes/User/UserRouterRegister';



async function startServer() {

    const expenseRouterCreateExpense =  await ExpenseRouterCreateExpense();
    const expenseRouterGetExpensesByCategory = await ExpenseRouterGetExpensesByCategory()
    const expenseRouterGetExpensesByUser = await ExpenseRouterGetExpensesByUser();
    const expenseRouterGetMonthlyReport = await ExpenseRouterGetMonthlyReport();
    const expenseRouterDeleteExpense = await ExpenseRouterDeleteExpense();
    const userRouterLogin = await UserRouterLogin();
    const userRouterGetUserById = await UserRouterGetUserById();
    const userRouterRegister = await UserRouterRegister();

    const app = express();

    app.use(express.json());


    app.use(expenseRouterCreateExpense);
    app.use(expenseRouterGetExpensesByCategory);
    app.use(expenseRouterGetExpensesByUser);
    app.use(expenseRouterGetMonthlyReport);
    app.use(expenseRouterDeleteExpense);
    app.use(userRouterLogin);
    app.use(userRouterGetUserById);
    app.use(userRouterRegister);


    app.listen(3000, () => {
        console.log(" Servidor rodando na porta 3000");
    });
}

startServer();