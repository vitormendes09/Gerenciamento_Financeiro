import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API - Documentação Swagger',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger com Express e TypeScript',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['.src/infra/routes/User/UserRouterLogin.ts', 
        '.src/controller/User/UserControllerLogin.ts',
        '.src/infra/routes/User/UserRouterGetUserById.ts',
        '.src/controller/User/UserControllerGetUserById.ts',
        '.src/infra/routes/User/UserRouterRegister.ts',
        '.src/controller/User/UserControllerRegister.ts', 
        '.src/infra/routes/Expense/ExpenseRouterCreateExpense.ts', 
        '.src/controller/Expense/ExpenseControllerCreateExpense.ts', 
        '.src/infra/routes/Expense/ExpenseRouterGetExpensesByCategory.ts', 
        '.src/controller/Expense/ExpenseControllerGetExpensesByCategory.ts', 
        '.src/infra/routes/Expense/ExpensesRouterGetExpensesByUser.ts', 
        '.src/controller/Expense/ExpenseControllerGetExpensesByUser.ts', 
        '.src/infra/routes/Expense/ExpensesRouterGetMonthlyReport.ts', 
        '.src/controller/Expense/ExpenseControllerGetMonthlyReport.ts', 
        '.src/infra/routes/Expense/ExpenseRouterDeleteExpense.ts', 
        '.src/controller/Expense/ExpenseControllerDeleteExpense.ts'], 
};  

export const swaggerSpec = swaggerJSDoc(options);
