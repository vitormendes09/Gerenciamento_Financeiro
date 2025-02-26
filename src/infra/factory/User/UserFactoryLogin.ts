import { IUserControllerLogin } from "../../../contract/controllers/IUserController";
import { UserControllerLogin } from "../../../controller/User/UserControllerLogin";
import { IUserUseCaseLogin } from "../../../contract/usecase/IUserUseCase";
import { UserUseCaseLogin } from "../../../domain/usecase/User/UserUseCaseLogin";
import { IUserRepositoryFind } from "../../../contract/repositories/IUserRepository";
import { UserRepositoryFind } from "../../../data/repository/UserRepository";
import { IUser } from "../../../contract/entities/IUser";
import { User } from "../../../data/models/User";
import connectDB from "../../../data/config/database";

export async function UserFactoryLogin() {
    await connectDB();

    const userRepository: IUserRepositoryFind<IUser> = new UserRepositoryFind(User);
    const userUseCase: IUserUseCaseLogin = new UserUseCaseLogin( userRepository);
    const userController: IUserControllerLogin = new UserControllerLogin(userUseCase);

    return userController;
}