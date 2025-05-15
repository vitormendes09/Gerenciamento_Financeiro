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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ExpenseRouterCreateExpense_1 = __importDefault(require("./infra/routes/Expense/ExpenseRouterCreateExpense"));
const ExpenseRouterGetExpensesByCategory_1 = __importDefault(require("./infra/routes/Expense/ExpenseRouterGetExpensesByCategory"));
const ExpensesRouterGetExpensesByUser_1 = __importDefault(require("./infra/routes/Expense/ExpensesRouterGetExpensesByUser"));
const ExpensesRouterGetMonthlyReport_1 = __importDefault(require("./infra/routes/Expense/ExpensesRouterGetMonthlyReport"));
const ExpenseRouterDeleteExpense_1 = __importDefault(require("./infra/routes/Expense/ExpenseRouterDeleteExpense"));
const UserRouterLogin_1 = __importDefault(require("./infra/routes/User/UserRouterLogin"));
const UserRouterGetUserById_1 = __importDefault(require("./infra/routes/User/UserRouterGetUserById"));
const UserRouterRegister_1 = __importDefault(require("./infra/routes/User/UserRouterRegister"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = require("./swaggerConfig");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const expenseRouterCreateExpense = yield (0, ExpenseRouterCreateExpense_1.default)();
        const expenseRouterGetExpensesByCategory = yield (0, ExpenseRouterGetExpensesByCategory_1.default)();
        const expenseRouterGetExpensesByUser = yield (0, ExpensesRouterGetExpensesByUser_1.default)();
        const expenseRouterGetMonthlyReport = yield (0, ExpensesRouterGetMonthlyReport_1.default)();
        const expenseRouterDeleteExpense = yield (0, ExpenseRouterDeleteExpense_1.default)();
        const userRouterLogin = yield (0, UserRouterLogin_1.default)();
        const userRouterGetUserById = yield (0, UserRouterGetUserById_1.default)();
        const userRouterRegister = yield (0, UserRouterRegister_1.default)();
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)({
            origin: 'http://localhost:3000',
            credentials: true,
        }));
        app.use(express_1.default.json());
        app.use(expenseRouterCreateExpense);
        app.use(expenseRouterGetExpensesByCategory);
        app.use(expenseRouterGetExpensesByUser);
        app.use(expenseRouterGetMonthlyReport);
        app.use(expenseRouterDeleteExpense);
        app.use(userRouterLogin);
        app.use(userRouterGetUserById);
        app.use(userRouterRegister);
        app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.swaggerSpec));
        app.listen(3000, () => {
            console.log(" Servidor rodando na porta 3000");
        });
    });
}
startServer();
