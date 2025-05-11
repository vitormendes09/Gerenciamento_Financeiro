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
exports.UserUseCaseRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthService_1 = require("../../Auth/AuthService");
class UserUseCaseRegister {
    constructor(userRepositoryInsert) {
        this.userRepositoryInsert = userRepositoryInsert;
    }
    register(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = input;
            // Verificar se todos os dados foram fornecidos
            if (!name || !email || !password) {
                return { success: false, message: "All fields are required." };
            }
            // Verificar se o nome tem pelo menos 4 caracteres  
            if (name.length < 4) {
                return { success: false, message: "Name must have at least 4 characters." };
            }
            // Verificar se a senha tem pelo menos 5 caracteres
            // Verificar se o e-mail já está cadastrado
            console.log("Verificando e-mail:", email);
            const existingUser = yield this.userRepositoryInsert.findByEmail(email);
            if (existingUser) {
                return { success: false, message: "Email already registered." };
            }
            // Criptografar a senha
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = { name, email, password: hashedPassword };
            const id = Date.now().toString();
            yield this.userRepositoryInsert.insert(id, newUser);
            console.log("Salvando usuário no banco:", newUser);
            const savedUser = Object.assign({ id }, newUser);
            // Gerar token
            const token = AuthService_1.AuthService.generateToken(savedUser);
            return {
                success: true,
                message: "User registered successfully.",
                user: savedUser,
                token: token
            };
        });
    }
}
exports.UserUseCaseRegister = UserUseCaseRegister;
