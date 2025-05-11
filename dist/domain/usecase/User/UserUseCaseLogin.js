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
exports.UserUseCaseLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthService_1 = require("../../Auth/AuthService");
class UserUseCaseLogin {
    constructor(userRepositoryFind) {
        this.userRepositoryFind = userRepositoryFind;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password) {
                return {
                    success: false,
                    message: "Password are required"
                };
            }
            const user = yield this.userRepositoryFind.findByEmail(email);
            if (!user) {
                return {
                    success: false,
                    message: "User not found"
                };
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return {
                    success: false,
                    message: "Password is incorrect"
                };
            }
            const token = AuthService_1.AuthService.generateToken(user);
            return {
                success: true,
                message: "User logged in",
                user: user,
                token: token
            };
        });
    }
}
exports.UserUseCaseLogin = UserUseCaseLogin;
