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
exports.UserFactoryGetUserById = UserFactoryGetUserById;
const UserControllerGetUserById_1 = require("../../../controller/User/UserControllerGetUserById");
const UserUseCaseGetUserById_1 = require("../../../domain/usecase/User/UserUseCaseGetUserById");
const UserRepository_1 = require("../../../data/repository/UserRepository");
const User_1 = require("../../../data/models/User");
const database_1 = __importDefault(require("../../../data/config/database"));
function UserFactoryGetUserById() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
        const userRepository = new UserRepository_1.UserRepositoryFind(User_1.User);
        const userUseCase = new UserUseCaseGetUserById_1.UserUseCaseGetUserById(userRepository);
        const userController = new UserControllerGetUserById_1.UserControllerGetUserById(userUseCase);
        return userController;
    });
}
