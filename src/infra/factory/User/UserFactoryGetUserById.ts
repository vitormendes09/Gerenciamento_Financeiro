import { IUserControllerGetUserById } from "../../../contract/controllers/IUserController";
import { UserControllerGetUserById } from "../../../controller/User/UserControllerGetUserById";
import { IUserUseCaseGetUserById } from "../../../contract/usecase/IUserUseCase";
import { UserUseCaseGetUserById } from "../../../domain/usecase/User/UserUseCaseGetUserById";
import { IUserRepositoryFind } from "../../../contract/repositories/IUserRepository";
import { UserRepositoryFind } from "../../../data/repository/UserRepository";
import {IUser} from "../../../contract/entities/IUser"
import { User } from "../../../data/models/User";
import connectDB from "../../../data/config/database";

export	 async function UserFactoryGetUserById() {
    await connectDB();

    const userRepository: IUserRepositoryFind<IUser> = new UserRepositoryFind(User);
    const userUseCase: IUserUseCaseGetUserById = new UserUseCaseGetUserById(userRepository);
    const userController: IUserControllerGetUserById = new UserControllerGetUserById(userUseCase);


    return userController;


}