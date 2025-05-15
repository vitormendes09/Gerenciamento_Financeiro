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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllerRegister = void 0;
const zod_1 = require("zod");
class UserControllerRegister {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = zod_1.z.object({
                    name: zod_1.z.string().min(4, "O nome deve ter no mínimo 4 caracteres."),
                    email: zod_1.z.string().email("E-mail inválido."),
                    password: zod_1.z.string().min(5, "A senha deve ter no mínimo 5 caracteres."),
                    confirmPassword: zod_1.z.string().min(5, "A senha deve ter no mínimo 5 caracteres.")
                }).refine(data => data.password === data.confirmPassword, { message: "As senhas não coincidem." });
                const { name, email, password } = schema.parse(req.body);
                const result = yield this.userUseCase.register({ name, email, password });
                if (!result.success) {
                    return res.status(400).json({ message: result.message });
                }
                return res.status(201).json({ message: result.message });
            }
            catch (err) {
                if (err instanceof zod_1.z.ZodError) {
                    return res.status(400).json({ message: "Erro de validação", errors: err.errors });
                }
                return res.status(500).json({ message: "Erro interno no servidor." });
            }
        });
    }
}
exports.UserControllerRegister = UserControllerRegister;
