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
exports.UserFactoryLogin = UserFactoryLogin;
const UserControllerLogin_1 = require("../../../controller/User/UserControllerLogin");
const UserUseCaseLogin_1 = require("../../../domain/usecase/User/UserUseCaseLogin");
const UserRepository_1 = require("../../../data/repository/UserRepository");
const User_1 = require("../../../data/models/User");
const database_1 = __importDefault(require("../../../data/config/database"));
function UserFactoryLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
        const userRepository = new UserRepository_1.UserRepositoryFind(User_1.User);
        const userUseCase = new UserUseCaseLogin_1.UserUseCaseLogin(userRepository);
        const userController = new UserControllerLogin_1.UserControllerLogin(userUseCase);
        return userController;
    });
}
