import { IUserControllerRegister } from "../../../contract/controllers/IUserController";
import { UserControllerRegister } from "../../../controller/User/UserControllerRegister";
import { IUserUseCaseRegister } from "../../../contract/usecase/IUserUseCase";
import { UserUseCaseRegister } from "../../../domain/usecase/User/UserUseCaseRegister";
import { IUserRepositoryInsert } from "../../../contract/repositories/IUserRepository";
import { UserRepositoryInsert } from "../../../data/repository/UserRepository";
import {IUser} from "../../../contract/entities/IUser"
import { User } from "../../../data/models/User";
import connectDB from "../../../data/config/database";

export async function UserFactoryRegister() {
    await connectDB();
    const userRepository: IUserRepositoryInsert<IUser> = new UserRepositoryInsert(User);
    const userUseCaseRegister: IUserUseCaseRegister = new UserUseCaseRegister(userRepository);
    const userController: IUserControllerRegister = new UserControllerRegister(userUseCaseRegister);

    return userController;
}